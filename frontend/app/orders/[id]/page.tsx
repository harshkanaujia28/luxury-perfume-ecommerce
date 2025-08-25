"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, CheckCircle, Package, Truck, XCircle } from "lucide-react";
import { RequestReturnDialog } from "@/components/request-return-dialog";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const statusSteps = [
  { status: "pending", icon: XCircle },
  { status: "confirmed", icon: CheckCircle },
  { status: "processing", icon: Package },
  { status: "shipped", icon: Truck },
  { status: "delivered", icon: CheckCircle },
];
const statusConfig = {
  pending: {
    icon: XCircle,
    color: "text-yellow-500",
    title: "Order Pending",
    message: "Your order is pending. We'll notify you once it's confirmed.",
  },
  confirmed: {
    icon: CheckCircle,
    color: "text-green-500",
    title: "Order Confirmed!",
    message: "Thank you for your purchase. Your order has been confirmed and is being processed.",
  },
  processing: {
    icon: Package,
    color: "text-blue-500",
    title: "Order Processing",
    message: "We are preparing your order for shipment.",
  },
  shipped: {
    icon: Truck,
    color: "text-indigo-500",
    title: "Order Shipped",
    message: "Your order has been shipped and is on its way.",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-600",
    title: "Order Delivered",
    message: "Your order has been delivered successfully.",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    title: "Order Cancelled",
    message: "Your order has been cancelled.",
  },
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const { getOrderById, cancelOrder } = useApi();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    try {
      await cancelOrder(order._id);
      setOrder({ ...order, status: "cancelled" });
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };
  const latestStatus = order?.statusHistory?.length
    ? order.statusHistory.findLast((entry) => entry.status === order.status)
    : null;


  const currentStep = useMemo(
    () => statusSteps.findIndex((step) => step.status === order?.status),
    [order]
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-32">
        <main className="max-w-5xl mx-auto px-4 py-10">
          {loading ? (
            <p className="text-gray-400">Loading order...</p>
          ) : !order ? (
            <p className="text-red-400">Order not found.</p>
          ) : (
            <>
              {/* Order Status Banner */}
              <div className="text-center mb-10">
                {order.status &&
                  (() => {
                    const config =
                      statusConfig[order.status] || statusConfig["pending"];
                    const Icon = config.icon;

                    return (
                      <>
                        <Icon
                          className={`${config.color} mx-auto w-14 h-14 drop-shadow-lg`}
                        />
                        <h1
                          className={`text-2xl font-bold mt-4 ${config.color || "text-lime-400"
                            }`}
                        >
                          {config.title}
                        </h1>
                        <p className="text-sm text-gray-400">{config.message}</p>
                        <p className="text-sm text-gray-300 mt-2">
                          <strong>Order ID:</strong> ORD-
                          {order._id.slice(-6).toUpperCase()} • Placed on{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </>
                    );
                  })()}
              </div>

              {/* Order Status Progress */}
              <div className="border border-lime-500/30 rounded-xl p-6 mb-10 bg-zinc-900">
                <h2 className="text-lg font-semibold mb-4 text-lime-400">
                  Order Status
                </h2>
                <div className="relative flex justify-between items-center text-center w-full">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const completed = index <= currentStep;
                    return (
                      <div
                        key={step.status}
                        className="flex flex-col items-center flex-1 relative"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${completed
                              ? "bg-lime-500 border-lime-500 text-black"
                              : "border-gray-600 text-gray-500 bg-zinc-800"
                            }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`text-xs mt-2 ${completed
                              ? "text-lime-400 font-medium"
                              : "text-gray-500"
                            }`}
                        >
                          {step.status}
                        </span>

                        {/* Line Connector */}
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute top-5 left-1/2 w-full h-0.5 z-0 ${statusSteps[index + 1].status === order.status ||
                                index < currentStep
                                ? "bg-lime-500"
                                : "bg-gray-600"
                              }`}
                            style={{
                              transform: "translateX(50%)",
                              width: "100%",
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 bg-zinc-800 border border-lime-500/30 p-4 rounded flex items-center gap-2 text-sm text-lime-300">
                  <Calendar size={16} />
                  <span>
                    <strong>Status Updated:</strong>{" "}
                    {latestStatus
                      ? new Date(latestStatus.updatedAt).toLocaleString()
                      : "N/A"}{" "}
                    • Estimated delivery within 15–20 business days
                  </span>
                </div>
              </div>

              {/* Shipping & Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Shipping Address */}
                <div className="border border-lime-500/30 bg-zinc-900 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-lime-400">
                    <Package size={18} /> Shipping Address
                  </h3>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>
                      <strong>Name:</strong> {order.customer}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.shippingAddress?.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress?.address}
                    </p>
                    <p>
                      <strong>City/State/ZIP:</strong>{" "}
                      {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                      - {order.shippingAddress?.zipCode}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border border-lime-500/30 bg-zinc-900 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-lime-400">
                    Order Summary
                  </h3>
                  {order.products.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 mb-4 border-b border-zinc-700 pb-3"
                    >
                      <img
                        src={
                          p.product.image?.startsWith("http")
                            ? p.product.image
                            : `${BASE_URL}${p.product.image}`
                        }
                        alt={p.product.name}
                        className="w-16 h-16 rounded object-cover border border-lime-500/30"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-200 text-sm">
                          {p.product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          Qty: {p.quantity} × ₹{p.product.price}
                        </p>
                        <p className="text-xs font-semibold text-lime-300">
                          Total: ₹{(p.quantity * p.product.price).toFixed(2)}
                        </p>
                        {p.selectedSize && (
                          <p className="text-xs text-gray-500 italic">
                            Selected Size: {p.selectedSize}
                          </p>
                        )}
                        <Link
                          href={`/product/${p.product._id}`}
                          className="text-lime-400 hover:underline text-xs"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                  <p className="font-semibold mt-2 text-right text-lime-400">
                    Grand Total: ₹
                    {typeof order.total === "number"
                      ? order.total.toFixed(2)
                      : "0.00"}
                  </p>

                  {order.status === "pending" && (
                    <button
                      onClick={handleCancel}
                      className="mt-4 px-4 py-2 text-sm bg-red-500/20 text-red-400 border border-red-500/40 rounded hover:bg-red-500/30"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {order && order.status === "delivered" && (
            <div className="mt-4">
              <RequestReturnDialog orderId={order._id} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>

  );
}
