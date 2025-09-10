"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, Home, Box, CreditCard } from "lucide-react"; // example icons
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/app/store/store";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className=" bg-white mx-auto flex items-center justify-between py-4 px-4 md:px-24">
      {/* Left section: Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12">
          <Image
            src="/logo.png"
            alt="Ecomm Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-xl font-bold text-gray-800  sm:block">
          My Ecommerce
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:flex items-center gap-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Products
        </Link>
        <Link
          href="/checkout"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Checkout
        </Link>

        {/* Cart Badge */}
        <Link href="/checkout" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-800" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Link>
      </div>

      {/* Mobile: Cart + Menu */}
      <div className="flex items-center sm:hidden gap-4">
        <Link href="/checkout" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-800" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Link>

        {/* Sheet Menu */}
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-gray-800" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <Home className="w-5 h-5" /> Home
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <Box className="w-5 h-5" /> Products
              </Link>
              <Link
                href="/checkout"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <CreditCard className="w-5 h-5" /> Checkout
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
