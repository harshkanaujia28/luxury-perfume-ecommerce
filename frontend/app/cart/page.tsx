"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseURL = "https://luxury-perfume-ecommerce.onrender.com";

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const items = state.items;

  const safePrice = (p: any) => (typeof p === "number" && !isNaN(p) ? p : 0);
  const safeQuantity = (q: any) => (typeof q === "number" && !isNaN(q) ? q : 1);

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Start shopping to add items to your cart.</p>
          <Button className="mt-6" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const calculateSummary = () => {
    const itemCount = state.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const subtotal = items.reduce((sum, item) => {
      const price = safePrice(item.price);
      return sum + price * safeQuantity(item.quantity);
    }, 0);


    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return { itemCount, subtotal, tax, total };
  };


  const { itemCount, subtotal, tax, total } = calculateSummary();

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const quantity = safeQuantity(item.quantity);
              const actualPrice = safePrice(item.product?.price);
              const price = safePrice(item.price); // ✅ This is the discounted price stored in cart
              const hasDiscount = price < actualPrice;

              const totalItemPrice = quantity * price;

              return (
                <Card key={item._id} className="shadow-sm border border-gray-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden border border-gray-100">
                        <Image
                          src={item.product?.image ? `${baseURL}${item.product.image}` : "/placeholder.svg"}
                          alt={item.product?.name ?? "Product image"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product?.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.product?.brand}</p>
                        <p className="text-sm text-gray-600">
                          Size: <span className="font-medium">{item.selectedSize || "Default"}</span>
                        </p>

                        <p className="text-md font-medium text-gray-900">
                          ₹{price.toFixed(2)}
                          {hasDiscount && (
                            <span className="ml-2 text-sm text-red-500 line-through">
                              ₹{actualPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item._id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item._id, quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{totalItemPrice.toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}


            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div>
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 text-base font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 mt-2"
                  size="lg"
                  onClick={() => {
                    const token = typeof window !== "undefined"
                      ? localStorage.getItem("token")
                      : null;
                    window.location.href = token ? "/checkout" : "/login";
                  }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
