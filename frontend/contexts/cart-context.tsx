"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import api from "@/utils/axios";

// ---------------- Types ----------------
export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    offer?: { isActive: boolean; type: string; value: number };
  };
  quantity: number;
  selectedSize: string;
  price: number; // final price (after offer)
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (
    productId: string,
    quantity?: number,
    selectedSize?: string,
    price?: number
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// ---------------- Meta Pixel helper ----------------
const trackMetaEvent = (event: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", event, data);
  }
};

// ---------------- Context ----------------
const CartContext = createContext<CartContextType | undefined>(undefined);

// ---------------- Reducer ----------------
type CartAction = { type: "SET_CART"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART": {
      const items = action.payload;

      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return { ...state, items, total, itemCount };
    }
    default:
      return state;
  }
}

// ---------------- Provider ----------------
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.get("/cart");
      dispatch({ type: "SET_CART", payload: res.data.items });
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    }
  };

  const refreshCart = loadCart;

  // ---------------- Add To Cart (Meta integrated) ----------------
  const addToCart = async (
    productId: string,
    quantity: number = 1,
    selectedSize: string = "",
    price: number = 0
  ) => {
    try {
      const res = await api.post("/cart/add", {
        productId,
        quantity,
        selectedSize,
        price,
      });

      dispatch({ type: "SET_CART", payload: res.data.items });

      // 🔥 Meta Pixel – AddToCart (AFTER success)
      trackMetaEvent("AddToCart", {
        content_ids: [productId],
        content_type: "product",
        value: price * quantity,
        currency: "INR",
      });
    } catch (err) {
      console.error("❌ addToCart error:", err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.post("/cart/remove", { id: productId });
      dispatch({ type: "SET_CART", payload: res.data.items });
    } catch (err) {
      console.error("❌ removeFromCart error:", err);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await api.post("/cart/update", { id: productId, quantity });
      dispatch({ type: "SET_CART", payload: res.data.items });
    } catch (err) {
      console.error("❌ updateQuantity error:", err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.delete("/cart/clear");
      dispatch({ type: "SET_CART", payload: res.data.items });
    } catch (err) {
      console.error("❌ clearCart error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ---------------- Hook ----------------
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
