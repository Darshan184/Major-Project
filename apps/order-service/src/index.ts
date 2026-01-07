import Fastify from "fastify";
import cors from "@fastify/cors";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";

const fastify = Fastify({
  logger: true,
});

// CORS
fastify.register(cors, { origin: "*" });

// Clerk plugin (CORRECT)
fastify.register(clerkPlugin);

// Health check
fastify.get("/health", async () => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  };
});

// Test route: Should be authenticated
fastify.get("/test", { preHandler: shouldBeUser }, async (request, reply) => {
  return {
    message: "Order service authenticated!",
    userId: request.userId,
  };
});

// Register additional routes
fastify.register(orderRoute);

// Start service
const start = async () => {
  try {
    await Promise.all([
      connectOrderDB(),
      producer.connect(),
      consumer.connect(),
    ]);

    await runKafkaSubscriptions();

    const PORT = Number(process.env.PORT) || 8003;

    await fastify.listen({ port: PORT, host: "0.0.0.0" });

    console.log(`🚀 Order service running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Order service failed to start:", err);
    process.exit(1);
  }
};

start();
