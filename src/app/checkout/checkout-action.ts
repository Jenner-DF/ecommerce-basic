"use server";

import { stripe } from "@/lib/stripe";
import z from "zod";
import { redirect } from "next/navigation";
import { cartSchema } from "@/lib/schemas";

export default async function checkoutAction(data: z.infer<typeof cartSchema>) {
  console.log(data);
  const line_items = data.items.map((item) => ({
    price_data: {
      currency: "sgd",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },

    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });
  redirect(session.url!);
}
