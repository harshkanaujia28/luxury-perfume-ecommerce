"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useCheckout } from "@/contexts/checkoutContext";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/contexts/api-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from "@radix-ui/react-radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axios";
import { loadRazorpayScript } from "@/utils/razorpay";


export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { delivery, setDelivery } = useCheckout();
  const { getProfile, updateProfile, createPaymentSession, placeOrder, validateCoupon } = useApi();
  const { toast } = useToast();

  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [profileData, setProfileData] = useState<any>({});
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState(0);
  const [couponType, setCouponType] = useState<"Percentage" | "Fixed Amount" | null>(null);
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [pincodeSuccess, setPincodeSuccess] = useState("");

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

  // ✅ Cart subtotal after offer discount
  const subtotalAfterOffer = state.items.reduce((sum, item) => {
    const price = item.price ?? item.product?.price ?? 0;
    let discount = 0;

    if (item.offer?.isActive) {
      if (item.offer.type === "Percentage") {
        discount = (price * item.offer.value) / 100;
      } else if (["Flat", "Fixed"].includes(item.offer.type)) {
        discount = item.offer.value;
      }
    }

    return sum + (price - discount) * item.quantity;
  }, 0);

  // ✅ Coupon discount (applied after offer)
  const couponDiscount =
    couponType === "Percentage"
      ? (couponValue / 100) * subtotalAfterOffer
      : couponType === "Fixed Amount"
        ? couponValue
        : 0;

  // ✅ Tax calculation
  const tax = parseFloat(((subtotalAfterOffer - couponDiscount) * 0.1).toFixed(2));

  // ✅ Final total including delivery fee
  const total = parseFloat((subtotalAfterOffer - couponDiscount + tax + (delivery?.deliveryFee || 0)).toFixed(2));

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  // ✅ Apply Coupon
  const applyCoupon = async () => {
    try {
      const result = await validateCoupon(couponCode, subtotalAfterOffer);
      if (result.valid) {
        setCouponValue(result.value);
        setCouponType(result.type);
        toast({
          title: "Coupon Applied",
          description:
            result.type === "Percentage"
              ? `${result.value}% discount applied`
              : `₹${result.value} discount applied`,
          variant: "success",
        });
      } else {
        let variant: "destructive" | "warning" | "info" = "destructive";

        if (result.message?.toLowerCase().includes("expired")) {
          variant = "warning"; // coupon expired
        } else if (result.message?.toLowerCase().includes("limit")) {
          variant = "warning"; // usage limit reached / per-user limit
        } else if (result.message?.toLowerCase().includes("minimum")) {
          variant = "info"; // min order / min quantity not met
        }
        setCouponValue(0);
        setCouponType(null);
        toast({
          title: "Coupon Error",
          description: result.message || "Coupon is not valid.",
          variant,
        });
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      toast({
        title: "Coupon Error",
        description: errorMessage,
        variant: "destructive",
      });
      setCouponValue(0);
      setCouponType(null);
    }
  };

  // ✅ Check Delivery (Pincode)
  const checkDelivery = async () => {
    if (!pincode) {
      toast({
        title: "Pincode Required",
        description: "Please enter a pincode to check delivery.",
        variant: "info", // ✅ info because user input missing
      });
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/zones/check-pincode`, { pincode });

      if (res.data.available) {
        setDelivery({
          deliveryFee: res.data.deliveryFee,
          deliveryTime: res.data.deliveryTime,
          zoneType: res.data.zoneType,
        });
        setSuccess("✅ Great news! Delivery is available in your area.");
        setError("");

        toast({
          title: "Delivery Available 🎉",
          description: `We deliver to your area. Delivery fee: ₹${res.data.deliveryFee}, Time: ${res.data.deliveryTime}`,
          variant: "success", // ✅ success when available
        });
      } else {
        setDelivery(null);
        setError(res.data.message || "❌ Sorry, we currently don't deliver to this pincode.");
        setSuccess("");

        toast({
          title: "Delivery Unavailable",
          description: res.data.message || "Sorry, we don't deliver to this pincode.",
          variant: "warning", // ✅ warning because condition unmet
        });
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong! Please try again later.";

      setError(`❌ ${errorMessage}`);
      setSuccess("");

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive", // ✅ destructive for server errors
      });
    } finally {
      setLoading(false);
    }
  };


  // ✅ Place Order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!delivery) {
      toast({
        title: "Delivery Required",
        description: "Please select a delivery option before checkout",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile(profileData);

      const totalOfferDiscount = state.items.reduce((sum, item) => {
        const price = item.price ?? item.product?.price ?? 0;
        let discount = 0;
        if (item.offer?.isActive) {
          if (item.offer.type === "Percentage") discount = (price * item.offer.value) / 100;
          else if (["Flat", "Fixed"].includes(item.offer.type)) discount = item.offer.value;
        }
        return sum + discount * item.quantity;
      }, 0);

      const products = state.items.map((item) => ({
        product: item.product?._id || item._id || item.productId,
        quantity: item.quantity,
        selectedSize: item.selectedSize || "Default",
        name: item.product?.name || item.name,
        brand: item.product?.brand || item.brand,
        image: item.product?.image || item.image,
        price: item.price ?? item.product?.price,
        offer: item.offer || null,
      }));

      const activeOfferId = state.items.find((item) => item.offer?.isActive)?._id || null;

      const orderPayload = {
        user: profileData._id,
        customer: profileData.name,
        email: profileData.email,
        products,
        itemsTotal: subtotalAfterOffer,
        discount: totalOfferDiscount,  // total offer discount
        couponCode: couponCode || null,
        couponType: couponType || null,
        couponValue: couponValue || 0,
        couponDiscount: couponDiscount,
        taxAmount: tax,
        deliveryFee: delivery?.deliveryFee || 0,
        finalTotal: total,
        activeOffer: activeOfferId,
        shippingAddress: {
          address: profileData.address,
          city: profileData.city,
          state: profileData.state,
          zipCode: profileData.zipCode,
          phone: profileData.phone,
        },
        deliveryTime: "1-2 days",
      };
      if (typeof window === "undefined") return;


      if (paymentMethod === "razorpay") {
        const res = await loadRazorpayScript();
        if (!res) {
          toast({ title: "Payment Failed", description: "Razorpay SDK failed to load", variant: "destructive" });
          setIsLoading(false);
          return;
        }

        try {
          const preValidate = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/pre-validate`, { products, couponCode: couponCode || null });
          if (!preValidate.data.success) {
            toast({ title: "Validation Failed", description: preValidate.data.message || "Offer/Stock invalid", variant: "destructive" });
            setIsLoading(false);
            return;
          }

          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, { amount: total });

          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: "INR",
            name: "Zafrine",
            description: "Order Payment",
            order_id: data.orderId,
            handler: async function (response: any) {
              try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`, {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderDetails: orderPayload,
                  paymentMethod: "Razorpay",
                  paymentStatus: "paid",
                });
                toast({ title: "Payment Successful 🎉", description: "Your order has been placed successfully!", variant: "success" });
                clearCart();
                router.push("/orders");
              } catch (err: any) {
                toast({ title: "Payment Verification Failed", description: err?.response?.data?.message || "Something went wrong", variant: "destructive" });
              }
            },
            prefill: { name: profileData?.name, email: profileData?.email, contact: profileData?.phone },
            theme: { color: "#84cc16" },
          };

          const paymentObject = new (window as any).Razorpay(options);
          paymentObject.open();
        } catch (err: any) {
          toast({ title: "Validation Error", description: err?.response?.data?.message || "Failed before payment", variant: "destructive" });
          setIsLoading(false);
          return;
        }
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, { ...orderPayload, paymentMethod: "COD", paymentStatus: "pending" });
        toast({ title: "Order Placed", description: "Your order has been placed successfully!", variant: "success" });
        clearCart();
        router.push("/orders");
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      toast({ title: "Checkout failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Header />
      <div className="min-h-screen bg-black">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
          <h1 className="text-3xl font-bold text-lime-400 mb-8">Checkout</h1>


          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Shipping & Payment */}
            <div className="space-y-8">
              {/* Delivery Check */}
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Check Delivery Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="bg-black border-lime-500/40 text-lime-300"
                    />
                    <Button type="button" onClick={checkDelivery} disabled={loading}>
                      {loading ? "Checking..." : "Check"}
                    </Button>
                  </div>

                  {error && <p className="text-red-500">{error}</p>}
                  {success && <p className="text-green-500">{success}</p>}
                </CardContent>
              </Card>
              {/* Contact Info */}
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={profileData.email || ""}
                    onChange={handleInputChange}
                    required
                    disabled
                    className="bg-black border-lime-500/40 text-lime-300"
                  />
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">

                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={profileData.name || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-black border-lime-500/40 text-lime-300"
                  />

                  <Label>Address</Label>
                  <Input
                    name="address"
                    value={profileData.address || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-black border-lime-500/40 text-lime-300"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        name="city"
                        value={profileData.city || ""}
                        onChange={handleInputChange}
                        required
                        className="bg-black border-lime-500/40 text-lime-300"
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        name="state"
                        value={profileData.state || ""}
                        onChange={handleInputChange}
                        required
                        className="bg-black border-lime-500/40 text-lime-300"
                      />
                    </div>
                    <div>
                      <Label>PinCode</Label>
                      <Input
                        name="zipCode"
                        value={profileData.zipCode || ""}
                        onChange={handleInputChange}
                        required
                        className="bg-black border-lime-500/40 text-lime-300"
                      />
                    </div>
                  </div>

                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={profileData.phone || ""}
                    onChange={handleInputChange}
                    required
                    className="bg-black border-lime-500/40 text-lime-300"
                  />

                  {/* Pincode check */}

                </CardContent>
              </Card>

              {/* Payment Method */}


            </div>

            {/* Right Column: Order Summary */}
            <div>
              <Card className="bg-zinc-900 border-2 border-lime-500 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lime-400 text-lg font-bold">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="text-lime-300">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as "razorpay" | "cod")}
                    className="flex flex-col space-y-2"
                  >
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem
                        value="razorpay"
                        id="razorpay"
                        className="w-5 h-5 border border-lime-500 rounded-full bg-black flex items-center justify-center focus:outline-none"
                      >
                        <RadioGroupIndicator className="w-2 h-2 bg-lime-500 rounded-full" />
                      </RadioGroupItem>
                      <Label htmlFor="razorpay" className="text-lime-300 font-medium">
                        Online Payment (Razorpay)
                      </Label>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem
                        value="cod"
                        id="cod"
                        className="w-5 h-5 border border-lime-500 rounded-full bg-black flex items-center justify-center focus:outline-none"
                      >
                        <RadioGroupIndicator className="w-2 h-2 bg-lime-500 rounded-full" />
                      </RadioGroupItem>
                      <Label htmlFor="cod" className="text-lime-300 font-medium">
                        Cash on Delivery (COD)
                      </Label>
                    </label>
                  </RadioGroup>

                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border border-lime-500/30 shadow-lg rounded-2xl mt-2">
                <CardHeader>
                  <CardTitle className="text-lime-400">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-300">
                  {state.items.map((item, i) => {
                    const price = item.price ?? item.product?.price ?? 0;
                    const name = item.product?.name || item.name || "Product";
                    const brand = item.product?.brand || item.brand || "Brand";
                    const selectedSize = item.selectedSize || "Default";
                    return (
                      <div key={i} className="flex justify-between items-center border-b border-zinc-700 pb-3">
                        <div className="flex-1">
                          <p className="font-medium text-gray-200">{name}</p>
                          <p className="text-gray-500 text-xs">
                            {brand} × {item.quantity} — <span className="ml-1 italic text-gray-400">{selectedSize}</span>
                          </p>
                        </div>
                        <span className="text-lime-400">{formatCurrency(price * item.quantity)}</span>
                      </div>
                    );
                  })}

                  <Separator className="bg-lime-500/30" />

                  {/* Coupon */}
                  <div className="flex items-center gap-2">
                    <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="bg-black border-lime-500/40 text-lime-300" />
                    <Button type="button" onClick={applyCoupon} disabled={!couponCode} className="border-lime-500/40 text-lime-400 hover:bg-lime-500 hover:text-black">Apply</Button>
                  </div>

                  <Separator className="bg-lime-500/30" />

                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotalAfterOffer.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
                  {delivery && <div className="flex justify-between"><span>Delivery Fee</span><span>₹{delivery.deliveryFee.toFixed(2)}</span></div>}
                  {couponValue > 0 && <div className="flex justify-between text-lime-400"><span>Coupon Discount</span><span>- ₹{couponType === "Percentage" ? ((couponValue / 100) * subtotalAfterOffer).toFixed(2) : couponValue.toFixed(2)}</span></div>}
                  <Separator className="bg-lime-500/30" />
                  <div className="flex justify-between font-semibold text-lg text-lime-400"><span>Total</span><span>₹{total.toFixed(2)}</span></div>

                  <Button type="submit" className="w-full bg-lime-500 text-black hover:bg-lime-600 transition font-semibold" size="lg" disabled={isLoading}>
                    {isLoading ? "Processing..." : paymentMethod === "cod" ? `Place COD Order - ₹${total.toFixed(2)}` : `Pay ₹${total.toFixed(2)} Online`}
                  </Button>
                </CardContent>
              </Card>
            </div>

          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}
