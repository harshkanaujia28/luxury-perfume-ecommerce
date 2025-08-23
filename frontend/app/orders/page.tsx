"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL 
export default function OrdersPage() {
  const { getMyOrders } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();

        const sortedOrders = (data.orders || []).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase(); // normalize
    return clsx("px-3 py-1 rounded-full text-xs font-medium capitalize", {
      "bg-green-100 text-green-700 border border-green-300": s === "delivered",
      "bg-yellow-100 text-yellow-700 border border-yellow-300": s === "pending",
      "bg-red-100 text-red-700 border border-red-300": s === "cancelled",
      "bg-gray-100 text-gray-600 border border-gray-300": ![
        "delivered",
        "pending",
        "cancelled",
      ].includes(s),
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      <main className="max-w-6xl mx-auto min-h-screen px-4 py-36">
        <h1 className="text-3xl font-bold mb-8 text-green-900 text-center">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600 animate-pulse">
              Loading your orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <img
              src="/empty-orders.svg"
              alt="No orders"
              className="w-40 h-40 opacity-80"
            />
            <p className="text-gray-600 text-lg">
              You haven’t placed any orders yet.
            </p>
            <Link
              href="/products"
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="border border-green-100 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-green-50 rounded-t-2xl px-6 py-4">
                  <CardTitle className="text-lg text-green-900 font-semibold">
                    <Link href={`/orders/${order._id}`}>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <span>View Order</span>
                        <span className="text-xs bg-white text-green-700 px-2 py-0.5 rounded-md">
                          #{order._id.slice(-6)}
                        </span>
                      </button>
                    </Link>

                  </CardTitle>
                  <span className={getStatusColor(order.status)}>
                    {order.status}
                  </span>
                </CardHeader>

                <CardContent className="space-y-5 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p>
                      <strong>Total:</strong> ₹{order.total}
                    </p>
                    <p>
                      <strong>Placed on:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-green-800 mb-3">Items:</p>
                    <ul className="space-y-4">
                      {order.products.map((p, idx) => {
                        const prod = p.product;
                        if (!prod) return null;

                        return (
                          <li
                            key={idx}
                            className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 transition"
                          >
                            <Link href={`/products/${prod._id}`} className="flex-shrink-0">
                              <img
                                src={
                                  p?.image
                                    ? p.image.startsWith("http")
                                      ? p.image
                                      : `${BASE_URL}${p.image}`
                                    : prod?.image?.startsWith("http")
                                      ? prod.image
                                      : prod?.image
                                        ? `${BASE_URL}${prod.image}`
                                        : prod?.images?.[0]?.startsWith("http")
                                          ? prod.images[0]
                                          : prod?.images?.[0]
                                            ? `${BASE_URL}${prod.images[0]}`
                                            : "/placeholder.svg"
                                }
                                alt={prod.name}
                                className="w-16 h-16 object-cover rounded-md border shadow-sm hover:scale-105 transition"
                              />
                            </Link>

                            <div>
                              <Link
                                href={`/products/${prod._id}`}
                                className="font-medium text-gray-900 hover:underline"
                              >
                                {prod.name}
                              </Link>
                              <p className="text-xs text-gray-500">
                                Qty: {p.quantity} × ₹{prod.price} = ₹
                                {(prod.price * p.quantity).toFixed(2)}
                              </p>
                              {p.selectedSize && (
                                <p className="text-xs italic text-gray-400">
                                  Size: {p.selectedSize}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
