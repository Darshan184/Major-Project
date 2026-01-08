import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";
import { startOfMonth, subMonths } from "date-fns";
import { OrderChartType } from "@repo/types";

export const orderRoute = async (fastify: FastifyInstance) => {
  // NEW: Create order endpoint
  fastify.post(
    "/create",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      try {
        const { shippingInfo, cart, subtotal, discount, shippingFee, total } =
          request.body as {
            shippingInfo: {
              name: string;
              email: string;
              phone: string;
              address: string;
              city: string;
            };
            cart: any[];
            subtotal: number;
            discount: number;
            shippingFee: number;
            total: number;
          };

        // Validate required fields
        if (!shippingInfo || !cart || cart.length === 0) {
          return reply.status(400).send({
            error: "Missing required fields: shippingInfo and cart",
          });
        }

        // Generate unique order ID
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

        // Create order document matching your schema
        const order = new Order({
          orderId: orderNumber,
          userId: request.userId, // From shouldBeUser middleware

          // Shipping information
          name: shippingInfo.name,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,

          // Order details (matching your schema)
          amount: total || subtotal, // Your schema uses "amount" for total
          subtotal: subtotal || 0,
          discount: discount || 0,
          shippingFee: shippingFee || 10,

          // Products (matching your schema structure)
          products: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            image: item.images?.[item.selectedColor] || item.image,
          })),

          // Order metadata
          status: "pending", // Start as pending instead of success
          paymentMethod: "cash_on_delivery",
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        });

        // Save to database
        await order.save();

        console.log("✅ Order created:", orderNumber);

        // TODO: Send confirmation email
        // await sendOrderEmail(shippingInfo.email, order);

        // Return success response
        return reply.status(201).send({
          success: true,
          message: "Order created successfully",
          id: orderNumber,
          orderId: orderNumber,
          order: order,
        });
      } catch (error) {
        console.error("❌ Order creation error:", error);
        return reply.status(500).send({
          error: "Failed to create order",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  );

  // Existing routes below
  fastify.get(
    "/user-orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      return reply.send(orders);
    }
  );

  fastify.get(
    "/orders",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const { limit } = request.query as { limit: number };
      const orders = await Order.find().limit(limit).sort({ createdAt: -1 });
      return reply.send(orders);
    }
  );

  fastify.get(
    "/order-chart",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const now = new Date();
      const sixMonthsAgo = startOfMonth(subMonths(now, 5));

      const raw = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo, $lte: now },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: { $sum: 1 },
            successful: {
              $sum: {
                $cond: [{ $eq: ["$status", "success"] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            total: 1,
            successful: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const results: OrderChartType[] = [];

      for (let i = 5; i >= 0; i--) {
        const d = subMonths(now, i);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;

        const match = raw.find(
          (item) => item.year === year && item.month === month
        );

        results.push({
          month: monthNames[month - 1] as string,
          total: match ? match.total : 0,
          successful: match ? match.successful : 0,
        });
      }

      return reply.send(results);
    }
  );
};