import { getProductById } from "@/actions/actions";
import ProductDetail from "@/components/custom/ProductDetail";

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);
  if (!product) throw new Error("Product not found");

  // Convert to plain object
  //should add a zod for validation
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={serializedProduct} />;
}
