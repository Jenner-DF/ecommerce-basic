import { cartItemSchema, cartSchema } from "./../../lib/schemas";
import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string | undefined;
//   quantity: number;
// }
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem, quantityToAdd: number) => void;
  setQuantity: (item: CartItem, quantity: number) => void;
  removeItem: (id: CartItem["id"]) => void;
  removeItemQuantity: (id: CartItem["id"]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantityToAdd) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing)
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantityToAdd }
                  : i
              ),
            };
          return { items: [...state.items, item] };
        }),
      setQuantity: (item, newQuantity) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing)
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: newQuantity } : i
              ),
            };
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      removeItemQuantity: (id) => {
        set((state) => {
          const newitems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
          //check if no quantity, delete it
          return { items: newitems.filter((item) => item.quantity > 0) };
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),

    { name: "cart" }
  )
);
