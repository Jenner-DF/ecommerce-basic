"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";

export default function QueryProvider({ children }: { children: ReactNode }) {
  //this will ensure data is not shared between users/request, creating once per component
  const queryClient = getQueryClient();
  // const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
