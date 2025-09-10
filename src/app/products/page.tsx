import { getAllProducts } from "@/actions/actions";
import ProductList from "@/components/custom/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Products listed here",
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  if (!products) throw new Error("No products found");
  return (
    <div>
      <ProductList products={products.data} />
    </div>
  );
}
