import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "./providers/get-query-client";
import { stripe } from "@/lib/stripe";
import { getProductsWithLimit } from "@/actions/actions";
import ProductList from "@/components/custom/ProductList";
import Banner from "@/components/custom/Banner";

const HomePage = async () => {
  //must store in a separate file, add a zod parse for data validation then return
  // await queryClient.prefetchQuery({
  //   queryKey: ["todos"],
  //   queryFn: () =>
  //     fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
  //       res.json()
  //     ),
  // });
  const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['products'],
  //   queryFn: ()=> stripe.products.list()
  // })
  const products = await getProductsWithLimit(5);
  if (!products) throw new Error("No products found");
  console.log(products);
  return (
    //take all data in queryclient then pass then dehydrate (accessible to client),
    // Hydration boundary handles it
    //thats is why we make new Queryclient so data will not be duplicated
    //this is the only to use server components with react query
    <>
      <Banner products={products.data} />
    </>
  );
};

export default HomePage;
