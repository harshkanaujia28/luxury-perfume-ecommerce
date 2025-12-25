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
  category: {
    type: string;
    gender: string;
    subCategories: string[];
  };
  offer?: {
    isActive: boolean;
    type: string;
    value: number;
  };
  rating: number;
  reviews: any[];
}

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  subCategories?: string[];
  gender?: string;
}

export function RelatedProducts({
  currentProductId,
  category,
  subCategories = [],
  gender,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchRelated = async () => {
      try {
        const params: any = {
          category,
          excludeId: currentProductId,
        };

        if (gender) params.gender = gender;
        if (subCategories.length > 0) {
          params.subCategories = subCategories.join(",");
        }

        const { data } = await axios.get("/products/related", { params });

        setRelatedProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [category, subCategories, gender, currentProductId]);

  if (loading) {
    return (
      <p className="text-gray-400 py-8 text-center">
        Loading related products...
      </p>
    );
  }

  if (!relatedProducts.length) {
    return (
      <p className="text-gray-400 py-8 text-center">
        No related products found.
      </p>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-white mb-6">
        Related Products
      </h2>
      <ProductGrid products={relatedProducts} />
    </section>
  );
}
