"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const { getMyOrders } = useApi();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();

        const sortedOrders = (data.orders || []).sort(
          (a: any, b: any) =>
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
    const s = status?.toLowerCase();
    return clsx("px-3 py-1 rounded-full text-xs font-medium capitalize", {
      "bg-lime-500/20 text-lime-400 border border-lime-500/40":
        s === "delivered",
      "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40":
        s === "pending",
      "bg-red-500/20 text-red-400 border border-red-500/40":
        s === "cancelled",
      "bg-gray-700 text-gray-300 border border-gray-600": ![
        "delivered",
        "pending",
        "cancelled",
      ].includes(s),
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-6xl mx-auto min-h-screen px-4 py-36">
        <h1 className="text-3xl font-bold mb-8 text-lime-400 text-center">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-400 animate-pulse">
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
            <p className="text-gray-400 text-lg">
              You haven’t placed any orders yet.
            </p>
            <Link
              href="/products"
              className="px-5 py-2 bg-lime-500 text-black rounded-lg shadow hover:bg-lime-400 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="border border-lime-500/30 bg-zinc-900 shadow-md rounded-2xl hover:shadow-lime-500/20 transition-all duration-300"
              >
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-800 rounded-t-2xl px-6 py-4">
                  <CardTitle className="text-lg text-lime-400 font-semibold">
                    <Link href={`/orders/${order._id}`}>
                      <button className="px-4 py-2 bg-lime-500 text-black rounded-lg shadow-md hover:bg-lime-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                        <span>View Order</span>
                        <span className="text-xs bg-black text-lime-400 px-2 py-0.5 rounded-md">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <p>
                      <strong>Total:</strong> ₹{order.finalTotal}
                    </p>
                    <p>
                      <strong>Placed on:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-lime-400 mb-3">Items:</p>
                    <ul className="space-y-4">
                      {order.products.map((p: any, idx: number) => {
                        const prod = p.product;
                        if (!prod) return null;

                        return (
                          <li
                            key={idx}
                            className="flex items-center gap-4 bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition"
                          >
                            <Link
                              href={`/products/${prod._id}`}
                              className="flex-shrink-0"
                            >
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
                                className="w-16 h-16 object-cover rounded-md border border-lime-500/30 shadow-sm hover:scale-105 transition"
                              />
                            </Link>

                            <div>
                              <Link
                                href={`/products/${prod._id}`}
                                className="font-medium text-gray-200 hover:underline"
                              >
                                {prod.name}
                              </Link>
                              <p className="text-xs text-gray-400">
                                Qty: {p.quantity} × ₹{prod.price} = ₹
                                {(prod.price * p.quantity).toFixed(2)}
                              </p>
                              {p.selectedSize && (
                                <p className="text-xs italic text-gray-500">
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
