"use client";
import { CartItem, useCartStore } from "@/app/store/store";
import Image from "next/image";
import Stripe from "stripe";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetail({
  product,
}: {
  product: Stripe.Product;
}) {
  const [count, setCount] = useState<number>(1);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const cartItem = items.find((item) => product.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddItem = () => {
    const cartItemToAdd: CartItem = {
      id: product.id,
      name: product.name,
      price: (product.default_price as Stripe.Price).unit_amount! / 100,
      quantity: count, //just a placeholder not used
      imageUrl: product?.images[0],
    };
    console.log(quantity);
    console.log(cartItem?.quantity);
    addItem(cartItemToAdd, count);
    toast.success(`Added ${count} of ${cartItemToAdd.name} to cart!`, {
      style: {
        background: "#111827", // dark gray
        color: "#f9fafb", // light text
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
      },
      duration: 2500,
    });
  };

  console.log(items);
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
      {/* Product Image */}
      <div className="relative w-full md:w-1/2 h-96 md:h-[500px]">
        <Image
          src={product.images?.[0] ?? "/placeholder.png"}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-start">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-neutral-700 mb-6">{product.description}</p>

        {/* Optional: Price */}
        {product.default_price && (
          <p className="text-xl font-semibold mb-4">
            $
            {(
              (product.default_price as Stripe.Price).unit_amount! / 100
            ).toFixed(2)}
          </p>
        )}
        <div>
          <Button onClick={() => setCount((c) => Math.max(c - 1, 1))}>-</Button>
          <input
            type="number"
            value={count}
            min={1}
            max={100}
            onChange={(e) => {
              const val = Math.max(1, Math.min(100, +e.target.value));
              setCount(val);
            }}
          />
          <Button onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
        <Button
          onClick={() => handleAddItem()}
          className="bg-neutral-900 text-white px-6 py-3 rounded-full hover:bg-neutral-700 transition"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
