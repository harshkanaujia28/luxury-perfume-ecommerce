"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApi } from "@/contexts/api-context";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/contexts/api-context"; // ✅ make sure User interface is defined

export default function ProfilePage() {
  const { user, getProfile, updateProfile } = useApi();
  const { toast } = useToast();
  const router = useRouter();

  const [profileData, setProfileData] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchData = async () => {
      const profile = await getProfile();
      if (!profile) {
        router.push("/login");
      } else {
        setProfileData(profile);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updated = await updateProfile(profileData);
      setProfileData(updated);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully saved.",
      });
    } catch (err) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating profile.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  if (!profileData.email) return null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {/* <TabsTrigger value="orders">Orders</TabsTrigger> */}
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={profileData.email || ""}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          {/* <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600">No orders found.</p>
                  <Button className="mt-4" asChild>
                    <a href="/products">Start Shopping</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Address Tab */}
          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profileData.city || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={profileData.state || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={profileData.zipCode || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSubmit}>Save Address</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
