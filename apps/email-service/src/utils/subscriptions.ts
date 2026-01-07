import { consumer } from "./kafka.ts";

export const runKafkaSubscriptions = async () => {
    await consumer.subscribe({ topic: "order-created", fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("📨 ORDER EVENT RECEIVED:", message.value?.toString());
        },
    });
};
