"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-6">{error.message}</p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
