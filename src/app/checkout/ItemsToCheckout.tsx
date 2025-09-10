"use client";
import Image from "next/image";
import { CartItem, useCartStore } from "../store/store";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

import * as z from "zod";
import { cartSchema } from "@/lib/schemas";

type FormType = z.infer<typeof cartSchema>;

export default function ItemsToCheckout({
  item,
  form,
  index,
}: {
  item: CartItem;
  form: { control: Control<FormType> };
  index: number;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const removeItemQuantity = useCartStore((state) => state.removeItemQuantity);

  return (
    <FormField
      control={form.control}
      name={`items.${index}.quantity`}
      render={({ field }) => (
        <FormItem className="p-4 border rounded-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src={item?.imageUrl || ""}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div>
              <p>{`items.${index}.quantity`}</p>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  type="button"
                  onClick={() => {
                    field.onChange(Math.max(1, field.value - 1));
                    removeItemQuantity(item.id);
                  }}
                >
                  -
                </Button>
                <FormControl>
                  <input
                    type="number"
                    value={field.value ?? item.quantity}
                    onChange={(e) => {
                      const qty = Math.max(1, Math.min(100, +e.target.value));
                      field.onChange(qty); // updates form state
                      setQuantity(item, qty);
                    }}
                    className="w-16 text-center border rounded-md"
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => {
                    console.log("quantity", item.quantity);
                    console.log(field);
                    field.onChange(Math.min(100, field.value + 1));
                    console.log(Math.min(100, field.value + 1));

                    addItem(item, 1);
                  }}
                >
                  +
                </Button>
              </div>
              <FormMessage />
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            type="button"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </Button>
        </FormItem>
      )}
    />
  );
}
