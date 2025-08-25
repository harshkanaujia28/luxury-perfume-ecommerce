"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const items = state.items;

  const safePrice = (p: any) => (typeof p === "number" && !isNaN(p) ? p : 0);
  const safeQuantity = (q: any) => (typeof q === "number" && !isNaN(q) ? q : 1);

  if (!items || items.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center py-36 text-center px-4 space-y-4 bg-black text-gray-200 min-h-screen">
          <ShoppingBag className="mx-auto h-12 w-12 text-lime-400" />
          <h2 className="text-2xl font-semibold text-lime-400">
            Your Cart is empty
          </h2>
          <p className="text-gray-400 max-w-md">
           Start shopping to add items to your cart.
          </p>
          <Button className="mt-6 bg-lime-500 text-black hover:bg-lime-400" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const calculateSummary = () => {
    const itemCount = state.items.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

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
    <>
    <Header />
    <div className="min-h-screen bg-black pt-36 text-gray-200">
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-lime-400">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const quantity = safeQuantity(item.quantity);
              const actualPrice = safePrice(item.product?.price);
              const price = safePrice(item.price);
              const hasDiscount = price < actualPrice;

              const totalItemPrice = quantity * price;

              return (
                <Card
                  key={item._id}
                  className="bg-zinc-900 border border-lime-400/40 hover:shadow-[0_0_15px_rgba(182,255,40,0.3)] transition"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden border border-lime-400/30">
                        <Image
                          src={item.product?.image || "/placeholder.svg"}
                          alt={item.product?.name ?? "Product image"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-1">
                        <h3 className="text-lg font-semibold text-lime-300">
                          {item.product?.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {item.product?.brand}
                        </p>
                        <p className="text-sm text-gray-400">
                          Size:{" "}
                          <span className="font-medium text-gray-200">
                            {item.selectedSize || "Default"}
                          </span>
                        </p>

                        <p className="text-md font-medium text-lime-400">
                          ₹{price.toFixed(2)}
                          {hasDiscount && (
                            <span className="ml-2 text-sm text-red-400 line-through">
                              ₹{actualPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item._id, quantity - 1)}
                          disabled={quantity <= 1}
                          className="text-lime-400 hover:bg-lime-500/20"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-gray-200">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item._id, quantity + 1)}
                          className="text-lime-400 hover:bg-lime-500/20"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-lg font-semibold text-lime-400">
                          ₹{totalItemPrice.toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-600"
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
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600"
              >
                Clear Cart
              </Button>
              <Button
                variant="ghost"
                asChild
                className="text-lime-400 hover:bg-lime-500/20"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-zinc-900 border border-lime-400/40">
              <CardHeader>
                <CardTitle className="text-lime-400">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-lime-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-lime-400/20 pt-4 text-base font-semibold">
                  <div className="flex justify-between text-lime-300">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-lime-500 text-black hover:bg-lime-400 mt-2"
                  size="lg"
                  onClick={() => {
                    const token =
                      typeof window !== "undefined"
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
      
    </div>
    <Footer />
</>
  );
}
