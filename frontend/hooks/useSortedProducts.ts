// hooks/useSortedProducts.ts
"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/contexts/api-context";

export function useSortedProducts() {
  const { getProducts } = useApi();
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    const products = await getProducts();
    if (!products || products.length === 0) return; // agar empty hai to skip

    const sorted = [...products]
      .filter((p) => p.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const unique = Array.from(new Map(sorted.map((p) => [p._id, p])).values());
    setSortedProducts(unique);
  };

  fetchProducts();
}, []);



  return sortedProducts;
}
