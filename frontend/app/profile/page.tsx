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
import { User } from "@/contexts/api-context";

export default function ProfilePage() {
  const { getProfile, updateProfile } = useApi();
  const { toast } = useToast();
  const router = useRouter();

  const [profileData, setProfileData] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false);

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
        variant: "success",
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
    <>
      <Header />
      <div className="min-h-screen bg-black py-28">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-lime-400 mb-8">My Account</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-lime-400/30 rounded-xl">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-lime-500 data-[state=active]:text-black text-gray-300"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="data-[state=active]:bg-lime-500 data-[state=active]:text-black text-gray-300"
              >
                Addresses
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card className="bg-zinc-900 border border-lime-400/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lime-400">
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name || ""}
                          onChange={handleChange}
                          required
                          className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          value={profileData.email || ""}
                          onChange={handleChange}
                          disabled
                          className="bg-black border-gray-700 text-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone || ""}
                          onChange={handleChange}
                          className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-lime-500 text-black hover:bg-lime-400"
                    >
                      {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="addresses" className="mt-6">
              <Card className="bg-zinc-900 border border-lime-400/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lime-400">Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <Label htmlFor="address" className="text-gray-300">
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address || ""}
                        onChange={handleChange}
                        className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-gray-300">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={profileData.city || ""}
                          onChange={handleChange}
                          className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-gray-300">
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={profileData.state || ""}
                          onChange={handleChange}
                          className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-gray-300">
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={profileData.zipCode || ""}
                          onChange={handleChange}
                          className="bg-black border-gray-700 text-gray-200 focus:border-lime-400"
                        />
                      </div>
                    </div>
                    <Button className="bg-lime-500 text-black hover:bg-lime-400">
                      Save Address
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer />
    </>
  );
}
