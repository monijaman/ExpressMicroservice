import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { CatelogEvent, MessageType, TOPIC_TYPE } from "../../types";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";

// Configuration properties for Kafka client
const CLIENT_ID = process.env.CLIENT_ID || "catalog-service";
const GROUP_ID = process.env.GROUP_ID || "catalog-service-group";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];

// Initialize Kafka instance
const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});

let producer: Producer;
let consumer: Consumer;

/**
 * Creates a Kafka topic if it does not already exist.
 * @param topic - List of topics to be created
 */
const createTopic = async (topic: string[]) => {
  const topics = topic.map((t) => ({
    topic: t,
    numPartitions: 2,
    replicationFactor: 1, // Adjust based on available brokers
  }));

  const admin = kafka.admin();
  await admin.connect();
  const topicExists = await admin.listTopics();
  console.log("Existing topics:", topicExists);

  for (const t of topics) {
    if (!topicExists.includes(t.topic)) {
      await admin.createTopics({ topics: [t] });
    }
  }
  await admin.disconnect();
};

/**
 * Connects and initializes the Kafka producer.
 * @returns A connected producer instance.
 */
const connectProducer = async <T>(): Promise<T> => {
  await createTopic(["CatalogEvents"]);

  if (producer) {
    console.log("Producer already connected with existing connection");
    return producer as unknown as T;
  }

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();
  console.log("Producer connected with a new connection");
  return producer as unknown as T;
};

/**
 * Disconnects the Kafka producer.
 */
const disconnectProducer = async (): Promise<void> => {
  if (producer) {
    await producer.disconnect();
  }
};

/**
 * Publishes a message to the specified Kafka topic.
 * @param data - The message payload to be published.
 * @returns A boolean indicating success or failure.
 */
const publish = async (data: PublishType): Promise<boolean> => {
  const producer = await connectProducer<Producer>();
  const result = await producer.send({
    topic: data.topic,
    messages: [
      {
        headers: data.headers,
        key: data.event,
        value: JSON.stringify(data.message),
      },
    ],
  });
  console.log("Publishing result:", result);
  return result.length > 0;
};

/**
 * Connects and initializes the Kafka consumer.
 * @returns A connected consumer instance.
 */
const connectConsumer = async <T>(): Promise<T> => {
  if (consumer) {
    return consumer as unknown as T;
  }

  consumer = kafka.consumer({
    groupId: GROUP_ID,
  });

  await consumer.connect();
  return consumer as unknown as T;
};

/**
 * Disconnects the Kafka consumer.
 */
const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};

/**
 * Subscribes to a Kafka topic and handles incoming messages.
 * @param messageHandler - The function to process incoming messages.
 * @param topic - The topic to subscribe to.
 */
const subscribe = async (
  messageHandler: MessageHandler,
  topic: TOPIC_TYPE
): Promise<void> => {
  const consumer = await connectConsumer<Consumer>();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (["CatalogEvents", "otherEvents"].includes(topic)) {
        return;
      }

      if (message.key && message.value) {
        const inputMessage: MessageType = {
          headers: message.headers,
          event: message.key.toString() as CatelogEvent,
          data: message.value ? JSON.parse(message.value.toString()) : null,
        };
        await messageHandler(inputMessage);

        // Commit offset to mark the message as processed
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      }
    },
  });
};

// Exporting message broker functionalities
export const MessageBroker: MessageBrokerType = {
  connectProducer,
  disconnectProducer,
  publish,
  connectConsumer,
  disconnectConsumer,
  subscribe,
};
