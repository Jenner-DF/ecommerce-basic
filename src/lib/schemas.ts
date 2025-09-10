// src/lib/cart-schemas.ts
import * as z from "zod";

export const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().min(1),
  imageUrl: z.string().url().optional(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Cart cannot be empty"),
});

export type CartSchemaType = z.infer<typeof cartSchema>;
