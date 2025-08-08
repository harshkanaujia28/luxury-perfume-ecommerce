"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { getProfile, updateProfile, createPaymentSession, placeOrder, validateCoupon } = useApi();
  const { toast } = useToast();

  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [profileData, setProfileData] = useState<any>({});
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState(0);
  const [couponType, setCouponType] = useState<"Percentage" | "Fixed Amount" | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile) setProfileData(profile);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  if (!hasMounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const subtotal = state.items.reduce((sum, item) => {
    const price = item.price ?? item.product?.price ?? 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 1;
    return sum + price * quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const couponDiscount = couponType === "Percentage"
    ? (couponValue / 100) * subtotal
    : couponType === "Fixed Amount"
      ? couponValue
      : 0;
  const total = subtotal + tax - couponDiscount;

  const applyCoupon = async () => {
    try {
      const result = await validateCoupon(couponCode);

      if (result.valid) {
        setCouponValue(result.value);
        setCouponType(result.type);

        toast({
          title: "Coupon Applied",
          description: result.type === "Percentage"
            ? `${result.value}% discount applied`
            : `₹${result.value} discount applied`,
          variant: "default",
        });
      } else {
        setCouponValue(0);
        setCouponType(null);

        toast({
          title: "Invalid Coupon",
          description: result.message || "Coupon is not valid.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      toast({
        title: "Error",
        description: "Something went wrong while applying the coupon.",
        variant: "destructive",
      });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(profileData);

      const products = state.items.map((item) => ({
        product: item.product?._id || item._id || item.productId || item?.product,
        quantity: item.quantity,
        selectedSize: item.selectedSize || "Default",
        name: item.product?.name || item.name,
        brand: item.product?.brand || item.brand,
        image: item.product?.image || item.image,
        price: item.price ?? item.product?.price,
      }));

      if (!products.every((p) => p.product)) {
        toast({
          title: "Invalid cart items",
          description: "Some items are missing product ID",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const orderPayload = {
        customer: profileData.name,
        email: profileData.email,
        total,
        status: "pending",
        products,
        shippingAddress: {
          address: profileData.address,
          city: profileData.city,
          state: profileData.state,
          zipCode: profileData.zipCode,
          phone: profileData.phone,
        },
        coupon: couponCode ? {
          code: couponCode,
          type: couponType,
          value: couponValue,
        } : null,
      };

      if (paymentMethod === "online") {
        const res = await createPaymentSession(total, "Order Payment");
        if (res?.url) {
          window.location.href = res.url;
        } else {
          throw new Error("No payment URL received");
        }
      } else {
        const newOrder = await placeOrder(orderPayload);
        toast({
          title: "Order placed successfully!",
          description: `Order ID: ${newOrder?._id || "Not available"}`,
        });
        clearCart();
        router.push("/orders");
      }
    } catch (err) {
      console.error("Checkout failed", err);
      toast({
        title: "Checkout failed",
        description: "Something went wrong during checkout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Shipping & Payment */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={profileData.email || ""}
                    onChange={handleInputChange}
                    required
                    disabled
                  />
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={profileData.name || ""}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Address</Label>
                  <Input
                    name="address"
                    value={profileData.address || ""}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        name="city"
                        value={profileData.city || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        name="state"
                        value={profileData.state || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label>ZIP</Label>
                      <Input
                        name="zipCode"
                        value={profileData.zipCode || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={profileData.phone || ""}
                    onChange={handleInputChange}
                    required
                  />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "online" | "cod")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online Payment (Stripe)</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Side: Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-700">
                  {state.items.map((item, i) => {
                    const price = item.price ?? item.product?.price ?? 0;
                    const name = item.product?.name || item.name || "Product";
                    const brand = item.product?.brand || item.brand || "Brand";
                    const selectedSize = item.selectedSize || "Default";

                    return (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{name}</p>
                          <p className="text-gray-500">
                            {brand} × {item.quantity} —{" "}
                            <span className="ml-1 italic text-xs text-gray-600">{selectedSize}</span>
                          </p>
                        </div>
                       <span>{formatCurrency(total)}</span>
                      </div>
                    );
                  })}

                  <Separator />

                  {/* Coupon Input */}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={applyCoupon}
                      disabled={isLoading || !couponCode}
                    >
                      Apply
                    </Button>
                  </div>

                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  {couponValue > 0 && (
                    <div className="flex justify-between text-blue-700">
                      <span>Coupon Discount</span>
                      <span>
                        - ₹
                        {couponType === "Percentage"
                          ? ((couponValue / 100) * subtotal).toFixed(2)
                          : couponValue.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Placing Order..."
                      : paymentMethod === "cod"
                        ? `Place COD Order - ₹${total.toFixed(2)}`
                        : `Pay ₹${total.toFixed(2)} Online`}
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
