"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { ProductGrid } from "../components/product-grid";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  category: { type: string; gender: string; subCategories: string[] };
  offer?: { isActive: boolean; type: string; value: number };
  rating: number;
  reviews: any[];
}

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  subCategories: string[];
  gender: string;
}

export function RelatedProducts({
  currentProductId,
  category,
  subCategories,
  gender,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchRelated = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
        const subcategoryArray = subCategories || [];

        const params: any = {
          category,
          gender,
          excludeId: currentProductId,
        };

        subcategoryArray.forEach((sub) => {
          if (!params.subCategories) params.subCategories = [];
          params.subCategories.push(sub);
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${baseURL}/products/related`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRelatedProducts(data);
        console.log("Related products:", data);
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [category, subCategories, gender, currentProductId]);

  if (loading)
    return (
      <p className="text-gray-400 py-8 text-center">
        Loading related products...
      </p>
    );
  if (relatedProducts.length === 0)
    return (
      <p className="text-gray-400 py-8 text-center">
        No related products found.
      </p>
    );

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-white mb-6">
        Related Perfume
      </h2>
      <ProductGrid products={relatedProducts} />
    </section>
  );
}
