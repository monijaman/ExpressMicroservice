/**
 *
 * Consumer, Producer: These are KafkaJS types representing message consumers and producers.
 * MessageBroker: A utility module that abstracts Kafka operations
 * (connecting producer/consumer, subscribing, and publishing messages).
 * HandleSubscription: A function that processes incoming messages from Kafka.
 * OrderEvent: Enum/type that defines various order-related events.
 *
 */
import { Consumer, Producer } from "kafkajs";
import { OrderEvent } from "../types";
import { MessageBroker } from "../utils";
import { HandleSubscription } from "./order.service";

/**
 * Initializes the Kafka message broker by setting up a producer and consumer.
 * - The producer is responsible for publishing messages to Kafka topics.
 * - The consumer listens for messages and processes them using `HandleSubscription`.
 */
export const InitializeBroker = async () => {
  try {
    // Connect to Kafka producer
    const producer = await MessageBroker.connectProducer<Producer>();

    // Log when the producer successfully connects
    producer.on("producer.connect", async () => {
      console.log("Orser Service Producer connected successfully");
    });

    // Connect to Kafka consumer
    const consumer = await MessageBroker.connectConsumer<Consumer>();

    // Log when the consumer successfully connects
    consumer.on("consumer.connect", async () => {
      console.log("Orser Service Consumer connected successfully");
    });

    // Subscribe to the "OrderEvents" topic and process messages using HandleSubscription
    await MessageBroker.subscribe(HandleSubscription, "OrderEvents");
  } catch (error) {
    console.error("Error initializing Kafka broker:", error);
  }
};

/**
 * Publishes an event to create an order.
 * - The event is sent to the "CatalogEvents" topic.
 * - The message contains order data.
 *
 * @param data - The order details to be published.
 */
export const SendCreateOrderMessage = async (data: any) => {
  try {
    await MessageBroker.publish({
      event: OrderEvent.CREATE_ORDER, // Event type for creating an order
      topic: "CatalogEvents", // Kafka topic for catalog-related events
      headers: {}, // Optional headers (empty in this case)
      message: data, // Order details payload
    });
  } catch (error) {
    console.error("Error publishing Create Order event:", error);
  }
};

/**
 * Publishes an event when an order is canceled.
 * - The event is sent to the "CatalogEvents" topic.
 * - The message contains order cancellation details.
 *
 * @param data - The order cancellation details to be published.
 */
export const SendOrderCanceledMessage = async (data: any) => {
  try {
    await MessageBroker.publish({
      event: OrderEvent.CANCEL_ORDER, // Event type for canceling an order
      topic: "CatalogEvents", // Kafka topic for catalog-related events
      headers: {}, // Optional headers (empty in this case)
      message: data, // Cancellation details payload
    });
  } catch (error) {
    console.error("Error publishing Cancel Order event:", error);
  }
};
