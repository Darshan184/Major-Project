"use client";

import { ShippingFormInputs } from "@repo/types";
import { CheckCircle2, Package, Mail, Home, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderSuccess = ({
    shippingForm,
}: {
    shippingForm: ShippingFormInputs | null;
}) => {
    const router = useRouter();
    const [orderNumber, setOrderNumber] = useState<string>("");

    useEffect(() => {
        // Get order number from localStorage or generate one
        const storedOrderId = localStorage.getItem("lastOrderId");
        if (storedOrderId) {
            setOrderNumber(storedOrderId);
        } else {
            // Generate a random order number if not available
            const randomOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            setOrderNumber(randomOrderId);
        }
    }, []);

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    return (
        <div className="flex flex-col gap-6">
            {/* Success Header */}
            <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 max-w-md text-sm">
                    Thank you for your order. We've received your order and will process
                    it shortly.
                </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Order Number</p>
                        <p className="font-medium text-sm">{orderNumber}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Order Date</p>
                        <p className="font-medium text-sm">
                            {new Date().toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Estimated Delivery</p>
                        <p className="font-medium text-sm">
                            {estimatedDelivery.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                        <p className="font-medium text-sm">Cash on Delivery</p>
                    </div>
                </div>
            </div>

            {/* Shipping Information */}
            {shippingForm && (
                <div className="bg-white border border-gray-100 rounded-lg p-6">
                    <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Shipping Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-xs text-gray-500">Name</span>
                            <span className="text-sm font-medium">{shippingForm.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-xs text-gray-500">Email</span>
                            <span className="text-sm font-medium">{shippingForm.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-xs text-gray-500">Phone</span>
                            <span className="text-sm font-medium">{shippingForm.phone}</span>
                        </div>
                        <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-xs text-gray-500">Address</span>
                            <span className="text-sm font-medium text-right max-w-[200px]">
                                {shippingForm.address}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-gray-500">City</span>
                            <span className="text-sm font-medium">{shippingForm.city}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Confirmation Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-blue-900">
                        Confirmation Email Sent
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                        We've sent an order confirmation to{" "}
                        <span className="font-medium">
                            {shippingForm?.email || "your email address"}
                        </span>
                        . Please check your inbox.
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                    onClick={() => router.push("/orders")}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                    Track Order
                    <ArrowRight className="w-4 h-4" />
                </button>
                <button
                    onClick={() => router.push("/")}
                    className="flex-1 bg-white border-2 border-gray-800 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                    Continue Shopping
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Support Info */}
            <div className="text-center pt-4 border-t">
                <p className="text-xs text-gray-600">
                    Need help with your order?{" "}
                    <a
                        href="/support"
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Contact Support
                    </a>
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;