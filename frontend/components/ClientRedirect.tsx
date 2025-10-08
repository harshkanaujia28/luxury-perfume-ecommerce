"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    const path = window.location.pathname;

    // Admin store page open na kare
    if (role === "admin" && !path.startsWith("/admin")) {
      router.replace("/admin");
    }

    // User admin page open na kare
    if (role === "user" && path.startsWith("/admin")) {
      router.replace("/"); // redirect to store
    }

    // Vendor admin page open na kare (agar admin panel vendor-specific nahi)
    if (role === "vendor" && path.startsWith("/admin")) {
      router.replace("/vendor");
    }
  }, []);

  return null;
}
