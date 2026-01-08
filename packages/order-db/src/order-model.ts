import mongoose, { InferSchemaType, model } from "mongoose";
const { Schema } = mongoose;

export const OrderStatus = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "success",
  "failed"
] as const;

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },

    // Shipping Information
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },

    // Order Details
    amount: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    shippingFee: {
      type: Number,
      default: 10
    },

    status: {
      type: String,
      required: true,
      enum: OrderStatus,
      default: "pending"
    },

    paymentMethod: {
      type: String,
      default: "cash_on_delivery"
    },

    products: {
      type: [
        {
          id: { type: Number },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
          selectedSize: { type: String },
          selectedColor: { type: String },
          image: { type: String },
        },
      ],
      required: true,
    },

    estimatedDelivery: {
      type: Date
    },
  },
  { timestamps: true }
);

// Add indexes for better query performance
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ status: 1 });

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;

export const Order = model<OrderSchemaType>("Order", OrderSchema);