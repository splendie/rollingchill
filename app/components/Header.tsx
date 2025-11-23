'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-[999]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left side with RC image logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="relative w-12 h-12">
              <Image 
                src="/images/logos/128.webp" 
                alt="RC Logo" 
                width={48} 
                height={48}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center space-x-8">
              <li>
                <Link href="/" className="text-black hover:font-bold transition-all font-medium text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-black hover:font-bold transition-all font-medium text-base">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-black hover:font-bold transition-all font-medium text-base">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-black hover:font-bold transition-all font-medium text-base">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:font-bold transition-all font-medium text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right side - Cart and Join button */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-red-500 hover:text-red-600 transition-colors">
              <ShoppingCart className="w-6 h-6" strokeWidth={2} />
            </Link>
            <Link
              href="/login"
              className="hidden md:block bg-black text-[#FDD835] px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-semibold text-sm"
            >
              Join
            </Link>
            <button
              className="md:hidden text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <ul className="px-6 py-4 space-y-3">
            <li>
              <Link href="/" className="block text-black hover:font-bold text-base py-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block text-black hover:font-bold text-base py-2">
                Products
              </Link>
            </li>
            <li>
              <Link href="/events" className="block text-black hover:font-bold text-base py-2">
                Events
              </Link>
            </li>
            <li>
              <Link href="/news" className="block text-black hover:font-bold text-base py-2">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block text-black hover:font-bold text-base py-2">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="block bg-black text-[#FDD835] px-6 py-2 rounded-full text-center font-semibold">
                Join
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
