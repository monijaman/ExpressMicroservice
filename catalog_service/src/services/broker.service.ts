import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker";
import { CatalogService } from "./catalog.service";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }

  public async initializeBroker() {
    // Connect to Kafka producer
    this.producer = await MessageBroker.connectProducer<Producer>();

    // Log when the producer successfully connects
    this.producer.on("producer.connect", async () => {
      console.log("Catalog Servcie Producer connected successfully");
    });

    // Connect to Kafka consumer
    this.consumer = await MessageBroker.connectConsumer<Consumer>();

    // Log when the consumer successfully connects
    this.consumer.on("consumer.connect", async () => {
      console.log("Catalog Servcie  Consumer connected successfully");
    });

    // Subscribe to the "OrderEvents" topic and process messages using HandleSubscription
    await MessageBroker.subscribe(
      this.catalogService.handleBrokerMessage.bind(this.catalogService),
      "CatalogEvents"
    );
  }
  // publish delete product
  public async sendDeleteProudctMessage(data: unknown) {}
}
