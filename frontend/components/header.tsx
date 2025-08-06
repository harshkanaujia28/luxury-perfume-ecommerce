"use client";

import { Heart, ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { useApi } from "@/contexts/api-context"; // updated to useApi
import { useWishlist } from "@/contexts/wishlist-context";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";




export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useCart();
  const { user, logout } = useApi();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();
  const { clearWishlist } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/products?search=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };
  

  const navigation = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <nav className="flex items-center justify-between px-4 py-4 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-28 h-10">
            <Image
              src="/Z-1.png"
              alt="Luxe Fragrances Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-green-900 hover:text-green-600"
            >
              {item.name}
            </Link>
          ))}

          <form onSubmit={handleSearch} className="relative w-64">
            <Input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-full text-sm bg-white border border-green-300"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-green-400" />
            </button>
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-3">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-green-900 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-green-900 hover:text-green-600">
              <ShoppingCart className="h-5 w-5" />
              {state?.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative">
            <Button variant="ghost" size="icon" className="text-green-900 hover:text-green-600">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-green-900 hover:text-green-600">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-green-200 bg-white px-4 py-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="space-y-2 mb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-green-900 hover:bg-green-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="border-t border-green-200 pt-4">
            {user ? (
              <>
                <Link href="/profile" className="block px-3 py-2 text-green-900 hover:bg-green-50 rounded-md">
                  Profile
                </Link>
                <Link href="/orders" className="block px-3 py-2 text-green-900 hover:bg-green-50 rounded-md">
                  My Orders
                </Link>
                <Link href="/wishlist" className="block px-3 py-2 text-green-900 hover:bg-green-50 rounded-md">
                  Wishlist
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-green-900 hover:bg-green-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-green-900 hover:bg-green-50 rounded-md">
                  Login
                </Link>
                <Link href="/register" className="block px-3 py-2 text-green-900 hover:bg-green-50 rounded-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
