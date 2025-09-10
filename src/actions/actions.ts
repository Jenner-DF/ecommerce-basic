"use server";

import { stripe } from "@/lib/stripe";

export async function getAllProducts() {
  return stripe.products.list({
    expand: ["data.default_price"],
  });
}
export async function getProductsWithLimit(limit: number) {
  return stripe.products.list({
    expand: ["data.default_price"],
    limit: limit,
  });
}

export async function getProductById(productId: string) {
  return stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
}
