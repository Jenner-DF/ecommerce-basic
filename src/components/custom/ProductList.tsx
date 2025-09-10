"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import Stripe from "stripe";
import { Input } from "../ui/input";

interface ProductListProps {
  products: Stripe.Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = product.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || descriptionMatch;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-neutral-900 mb-6 text-center">
        Our Products
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <Input
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          placeholder="Search for products here"
          className="w-full max-w-md rounded-lg shadow-sm border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
        />
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500 mt-12">No products found.</p>
      )}
    </div>
  );
}
