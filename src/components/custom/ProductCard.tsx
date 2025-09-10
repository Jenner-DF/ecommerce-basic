"use client";

import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";

interface ProductCardProps {
  product: Stripe.Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow p-4"
    >
      {/* Product Image */}
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.images?.[0] ?? "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover rounded-md group-hover:scale-105 transition-transform"
          priority
        />
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-semibold text-neutral-900 truncate">
        {product.name}
        <p className="text-gray-600 mb-6 text-sm line-clamp-1">
          {product.description}
        </p>
      </h3>

      {/* Optional: Price if you have it */}
      {product.default_price && (
        <p className="mt-1 text-sm text-neutral-600">
          ${(product.default_price as Stripe.Price).unit_amount! / 100}
        </p>
      )}
    </Link>
  );
}
