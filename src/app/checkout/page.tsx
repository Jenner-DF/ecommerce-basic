"use client";

import { useCartStore } from "../store/store";
import { Button } from "@/components/ui/button";
import ItemsToCheckout from "./ItemsToCheckout";
import checkoutAction from "./checkout-action";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { cartItemSchema, cartSchema } from "@/lib/schemas";
//NOTE: this file must be a server component! (cant use metadata) #tired

export default function CheckoutPage() {
  throw new Error("this is error");
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  //BUG: i did not used this as map as i have to alter the store codebase, pass! next project!
  const itemsParsed = useMemo(
    () => z.array(cartItemSchema).parse(items),
    [items]
  );

  const total = itemsParsed.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  // console.log(itemsParsed);
  // console.log(itemsParsed[0].quantity);

  const form = useForm<z.infer<typeof cartSchema>>({
    resolver: zodResolver(cartSchema),
    defaultValues: {
      items: itemsParsed,
    },
    mode: "onChange",
  });

  //hydrate data after zustand

  useEffect(() => {
    if (items.length > 0) {
      form.reset({ items: itemsParsed });
    }
  }, [itemsParsed, form.reset, items.length, form]);

  const onSubmit = (data: z.infer<typeof cartSchema>) => {
    console.log("Cart submitted:", data);
    checkoutAction(data); // you can keep your server action call
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Cart Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {items.map((item, idx) => (
              <ItemsToCheckout
                key={item.id}
                item={item}
                form={form}
                index={idx}
              />
            ))}
          </div>

          {/* Total and Clear */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Button
              type="button"
              className="mt-4 md:mt-0"
              onClick={() => clearCart()}
              variant="secondary"
            >
              Clear Cart
            </Button>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full md:w-auto">
            Proceed to Payment
          </Button>
        </form>
      </Form>
    </div>
  );
}
