// src/app/success/page.tsx
"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "../store/store";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  clearCart();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! Your order is confirmed.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
}
