"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, CheckCircle, Package, Truck, XCircle } from "lucide-react";
import { RequestReturnDialog } from "@/components/request-return-dialog";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ;
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
    <div className="min-h-screen bg-white py-32">
      <main className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-gray-600">Loading order...</p>
        ) : !order ? (
          <p className="text-red-600">Order not found.</p>
        ) : (
          <>
            <div className="text-center mb-10">
              {order.status && (() => {
                const config = statusConfig[order.status] || statusConfig["pending"];
                const Icon = config.icon;

                return (
                  <>
                    <Icon className={`${config.color} mx-auto w-14 h-14`} />
                    <h1 className={`text-2xl font-bold mt-4 ${config.color.replace("text-", "text-")}`}>
                      {config.title}
                    </h1>
                    <p className="text-sm text-gray-600">{config.message}</p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>Order ID:</strong> ORD-{order._id.slice(-6).toUpperCase()} • Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </>
                );
              })()}
            </div>


            {/* Order Status Progress */}
            <div className="border rounded-xl p-6 mb-10">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="relative flex justify-between items-center text-center w-full">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const completed = index <= currentStep;
                  return (
                    <div key={step.status} className="flex flex-col items-center flex-1 relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${completed
                          ? "bg-green-600 border-green-600 text-white"
                          : "border-gray-300 text-gray-400"
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-xs mt-2 ${completed ? "text-green-600 font-medium" : "text-gray-400"
                          }`}
                      >
                        {step.status}
                      </span>

                      {/* Connecting Line */}
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`absolute top-5 left-1/2 w-full h-0.5 z-0 ${statusSteps[index + 1].status === order.status || index < currentStep
                            ? "bg-green-600"
                            : "bg-gray-300"
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
              <div className="mt-4 bg-blue-50 p-4 rounded flex items-center gap-2 text-sm text-blue-700">
                <Calendar size={16} />
                Estimated Delivery:{" "}
                <strong>Status Updated:</strong>{" "}
                {latestStatus ? new Date(latestStatus.updatedAt).toLocaleString() : "N/A"} • Your order will
                be delivered within 15-20 business days
              </div>
            </div>

            {/* Shipping & Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border p-4 rounded-xl">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Package size={18} /> Shipping Address
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Name:</strong> {order.customer}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
                    <p><strong>Address:</strong> {order.shippingAddress?.address}</p>
                    <p>
                      <strong>City/State/ZIP:</strong>{" "}
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}
                    </p>
                  </div>

                </p>
              </div>

              <div className="border p-4 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                {order.products.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        p.product.image?.startsWith("http")
                          ? p.product.image
                          : `${BASE_URL}${p.product.image}`
                      }
                      alt={p.product.name}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{p.product.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {p.quantity} × ₹{p.product.price}
                      </p>
                      <p className="text-xs font-semibold text-gray-700">
                        Total: ₹{(p.quantity * p.product.price).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {p.quantity} × ₹{p.product.price}
                      </p>
                      {p.selectedSize && (
                        <p className="text-xs text-gray-400 italic">
                          Selected Size: {p.selectedSize}
                        </p>
                      )}

                      <Link
                        href={`/product/${p.product._id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
                <p className="font-semibold mt-2 text-right">
                  <p className="font-semibold mt-2 text-right">
                    Grand Total: ₹{typeof order.total === "number" ? order.total.toFixed(2) : "0.00"}
                  </p>

                </p>
                {order.status === "pending" && (
                  <button
                    onClick={handleCancel}
                    className="mt-4 px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
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
