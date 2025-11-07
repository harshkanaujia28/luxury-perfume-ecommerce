"use client";

import { Heart, ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { useApi } from "@/contexts/api-context";
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

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black shadow-md border-b border-lime-400">
      <nav className="flex items-center justify-between px-4 py-4 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Zafrine_Logo.png"
            alt="Zafrine Perfume Logo"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white hover:text-lime-300 transition"
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
              className="pl-4 pr-10 py-2 rounded-full text-sm bg-neutral-900 border border-lime-400 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-lime-400" />
            </button>
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-lime-400 hover:text-lime-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-lime-400 hover:text-lime-300"
            >
              <ShoppingCart className="h-5 w-5" />
              {state?.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-lime-400 hover:text-lime-300"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-lime-400 hover:text-lime-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-black text-lime-300 border border-lime-400"
            >
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

      {/* ✅ Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-lime-400 px-6 py-6 space-y-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-full text-sm bg-neutral-900 border border-lime-400 text-white placeholder-gray-500 w-full"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-lime-400" />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-lime-300 text-base font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
