"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://luxury-perfume-ecommerce.onrender.com";

export default function OrdersPage() {
  const { getMyOrders } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();

      const sortedOrders = (data.orders || []).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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


  const getStatusColor = (status: string) =>
    clsx(
      "px-3 py-1 rounded-full text-xs font-medium capitalize",
      {
        "bg-green-100 text-green-800": status === "Delivered",
        "bg-yellow-100 text-yellow-800": status === "Pending",
        "bg-red-100 text-red-800": status === "Cancelled",
        "bg-gray-100 text-gray-800": !["Delivered", "Pending", "Cancelled"].includes(status),
      }
    );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-5xl mx-auto min-h-screen px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-green-900">My Orders</h1>

        {loading ? (
          <p className="text-gray-600 flex justify-center items-center">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 flex justify-center items-center">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-6 py-8">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="border border-green-100 shadow-sm rounded-xl"
              >
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg text-green-900 font-semibold">
                    <Link href={`/orders/${order._id}`}>View Order</Link>

                  </CardTitle>
                  <span className={getStatusColor(order.status)}>
                    {order.status}
                  </span>
                </CardHeader>

                <CardContent className="space-y-4 text-sm text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                      <strong>Total:</strong> ₹{order.total}
                    </p>
                    <p>
                      <strong>Placed on:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-green-800 mb-2">Items:</p>
                    <ul className="space-y-3">
                      {order.products.map((p, idx) => {
                        const prod = p.product;
                        if (!prod) return null;

                        return (
                          <li key={idx} className="flex items-center gap-4">
                            <img
                              src={`${BASE_URL}${prod.image}`}
                              alt={prod.name}
                              className="w-14 h-14 object-cover rounded-md border"
                            />
                            <div>
                              <p className="font-medium">{prod.name}</p>
                              <p className="text-xs text-gray-500">
                                Qty: {p.quantity} × ₹{prod.price} = ₹
                                {(prod.price * p.quantity).toFixed(2)}
                              </p>
                              {p.selectedSize && (
                                <p className="text-xs italic text-gray-400">
                                  Selected Size: {p.selectedSize}
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
