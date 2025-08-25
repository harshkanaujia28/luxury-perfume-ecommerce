import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 w-full mt-auto border-t border-lime-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Zafrine_Logo.png" alt="Zafrine" className="w-20 h-28" />
            </div>
            <p className="text-gray-500 text-sm">
              Discover timeless Zafrine fragrances that reflect your unique essence and personal style.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-lime-400 transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-lime-400 transition">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-lime-400 transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-lime-400 transition">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lime-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-lime-300">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-lime-300">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-lime-300">Brands</Link></li>
              <li><Link href="/about" className="hover:text-lime-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-lime-300">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lime-400">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="hover:text-lime-300">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-lime-300">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-lime-300">FAQ</Link></li>
              <li><Link href="/size-guide" className="hover:text-lime-300">Size Guide</Link></li>
              <li><Link href="/support" className="hover:text-lime-300">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lime-400">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-lime-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-lime-300">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-lime-300">Cookie Policy</Link></li>
              <li><Link href="/accessibility" className="hover:text-lime-300">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-lime-400/20 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 <span className="text-lime-400 font-semibold">Zafrine</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
