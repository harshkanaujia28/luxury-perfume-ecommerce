"use client";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useRef,
    ReactNode,
} from "react";
import axios from "@/utils/axios";
import { io, Socket } from "socket.io-client";

// ==================
// Types
// ==================

export interface Product {
    id: string
    name: string
    brand: string
    brandimage: string
    price: number
    originalPrice?: number
    image: string
    images: string[]
    description: string
    category: string
    inStock: boolean
    rating: number
    reviews: number
    features: string[]
    specifications: {
        skinType: string
        longevity: string
        sillage: string
        season: string
    }
}

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    brand: string
}
export interface Order {
    id: string
    customer: string
    email: string
    total: number
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    date: string // ISO date format (e.g. "2024-01-15")
    items: number // total number of items in the order
}
export interface Vendor {
    id: string
    name: string
    email: string
    phone?: string
    address?: string
    companyName?: string
    profileImage?: string
    products?: string[] // array of product IDs
    isActive: boolean
    createdAt: string // ISO date string
    updatedAt?: string
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    createdAt: string // ISO date string
    isRead: boolean
}

export interface Subscriber {
    id: string
    email: string
    subscribedAt: string // ISO date string
    isVerified?: boolean // Optional: if you implement email verification
}
interface AdminStats {
    totalRevenue: number;
    totalOrders: number;
    topSellingProducts: string[];
    newUsers: number;
}
// types/user.ts

export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    role: "admin" | "User" | "vendor";
    createdAt: string;
    updatedAt: string;
}
interface ProductFormData {
    name: string
    brand: string
    brandImage: string
    price: number
    originalPrice: number
    mainImage: string
    images: string[]
    description: string
    category: string
    inStock: boolean
    features: string[]
    offer: {
        isActive: boolean
        type: "percentage" | "fixed" | "bogo" | "bundle"
        value: number
        startDate: string
        endDate: string
        description: string
        minQuantity: number
        maxUses: number
    }
    specifications: {
        skinType: string
        longevity: string
        sillage: string
        season: string
    }
}
export interface Banner {
    _id: string;
    title: string;
    image: string;
    link?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}


interface ApiContextType {
    user: User | null;
    login(email: string, password: string): Promise<void>;
    register(data: Partial<User>): Promise<void>;
    logout(): void;
    getProfile(): Promise<void>;

    // PRODUCTS
    getProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    addProduct(data: Partial<Product>): Promise<Product>;
    editProduct(id: string, data: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<void>;

    // CATEGORIES & BRANDS
    getCategories(): Promise<string[]>;
    getBrands(): Promise<string[]>;

    // CART
    getCart(): Promise<CartItem[]>;
    addToCart(item: CartItem): Promise<void>;
    removeFromCart(item: CartItem): Promise<void>;

    // ORDERS
    placeOrder(data: any): Promise<Order>;
    getOrders(): Promise<Order[]>;
    trackOrder(orderId: string): Promise<Order>;
    requestReturn(orderId: string, payload: any): Promise<Order>;

    // WISHLIST
    getWishlist(): Promise<Product[]>;
    addToWishlist(productId: string): Promise<void>;
    removeFromWishlist(productId: string): Promise<void>;

    // ADMIN DASHBOARD
    getAdminStats(): Promise<any>;
    getRecentOrders(): Promise<Order[]>;
    getTopProducts(): Promise<Product[]>;


    // VENDORS
    addVendor(data: Partial<Vendor>): Promise<Vendor>;
    getVendors(): Promise<Vendor[]>;
    getVendorById(id: string): Promise<Vendor>;

    // CONTACT MESSAGES
    submitContactMessage(data: Partial<ContactMessage>): Promise<ContactMessage>;
    getContactMessages(): Promise<ContactMessage[]>;

    // NEWSLETTER
    subscribeNewsletter(email: string): Promise<Subscriber>;
    getNewsletterSubscribers(): Promise<Subscriber[]>;

    // STATIC PAGES
    getShippingPolicy(): Promise<string>;
    getReturnPolicy(): Promise<string>;
    getFAQ(): Promise<any>;
    getSupportInfo(): Promise<any>;
    // BANNERS
    createBanner(data: Partial<Banner>): Promise<Banner>;
    getActiveBanners(): Promise<Banner[]>;
    getAllBanners(): Promise<Banner[]>;
    updateBanner(id: string, data: Partial<Banner>): Promise<Banner>;
    deleteBanner(id: string): Promise<void>;


    // Socket
    socket: Socket | null;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const [user, dispatch] = useReducer(
        (state: User | null, action: any) => {
            switch (action.type) {
                case "SET_USER":
                    return action.payload;
                case "CLEAR_USER":
                    return null;
                default:
                    return state;
            }
        },
        null
    );

    const socketRef = useRef<Socket | null>(null);

    // =====================
    // Auth
    // =====================
    const login = async (email: string, password: string) => {
        const res = await axios.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        dispatch({ type: "SET_USER", payload: res.data.user });
    };

    const register = async (data: Partial<User>) => {
        const res = await axios.post("/auth/register", data);
        dispatch({ type: "SET_USER", payload: res.data.user });
    };

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "CLEAR_USER" });
    };

    const getProfile = async () => {
        const res = await axios.get("/profile");
        dispatch({ type: "SET_USER", payload: res.data.user });
    };

    // =====================
    // Products
    // =====================
    const getProducts = async () => {
        const res = await axios.get("/products");
        return res.data.products;
    };
    const getProductById = async (id: string) => {
        const res = await axios.get(`/products/${id}`);
        return res.data.product;
    };
    const addProduct = async (data: Partial<Product>) => {
        const res = await axios.post("/admin/product", data);
        return res.data.product;
    };
    const editProduct = async (id: string, data: Partial<Product>) => {
        const res = await axios.put(`/admin/product/${id}`, data);
        return res.data.product;
    };
    const deleteProduct = async (id: string) => {
        await axios.delete(`/admin/product/${id}`);
    };

    // =====================
    // Categories & Brands
    // =====================
    const getCategories = async () => {
        const res = await axios.get("/categories");
        return res.data.categories;
    };
    const getBrands = async () => {
        const res = await axios.get("/brands");
        return res.data.brands;
    };

    // =====================
    // Cart
    // =====================
    const getCart = async () => {
        const res = await axios.get("/cart");
        return res.data.items;
    };
    const addToCart = async (item: CartItem) => {
        await axios.post("/cart/add", item);
    };
    const removeFromCart = async (item: CartItem) => {
        await axios.post("/cart/remove", item);
    };

    // =====================
    // Orders
    // =====================
    const placeOrder = async (data: any) => {
        const res = await axios.post("/orders", data);
        return res.data.order;
    };
    const getOrders = async () => {
        const res = await axios.get("/orders");
        return res.data.orders;
    };
    const trackOrder = async (orderId: string) => {
        const res = await axios.get(`/orders/track/${orderId}`);
        return res.data.order;
    };
    const requestReturn = async (orderId: string, payload: any) => {
        const res = await axios.post(`/orders/${orderId}/return`, payload);
        return res.data.order;
    };

    // =====================
    // Wishlist
    // =====================
    const getWishlist = async () => {
        const res = await axios.get("/wishlist");
        return res.data.items;
    };
    const addToWishlist = async (productId: string) => {
        await axios.post("/wishlist/add", { productId });
    };
    const removeFromWishlist = async (productId: string) => {
        await axios.post("/wishlist/remove", { productId });
    };

    // =====================
    // Admin Dashboard
    // =====================
    const getAdminStats = async () => {
        const res = await axios.get("/admin/stats");
        return res.data;
    };
    const getRecentOrders = async () => {
        const res = await axios.get("/admin/orders/recent");
        return res.data.orders;
    };
    const getTopProducts = async () => {
        const res = await axios.get("/admin/products/top");
        return res.data.products;
    };

    // =====================
    // Vendors
    // =====================
    const addVendor = async (data: Partial<Vendor>) => {
        const res = await axios.post("/vendors", data);
        return res.data.vendor;
    };
    const getVendors = async () => {
        const res = await axios.get("/vendors");
        return res.data.vendors;
    };
    const getVendorById = async (id: string) => {
        const res = await axios.get(`/vendors/${id}`);
        return res.data.vendor;
    };

    // =====================
    // Contact & Newsletter
    // =====================
    const submitContactMessage = async (data: Partial<ContactMessage>) => {
        const res = await axios.post("/contact", data);
        return res.data.message;
    };
    const getContactMessages = async () => {
        const res = await axios.get("/contact");
        return res.data.messages;
    };
    const subscribeNewsletter = async (email: string) => {
        const res = await axios.post("/newsletter", { email });
        return res.data.subscriber;
    };
    const getNewsletterSubscribers = async () => {
        const res = await axios.get("/newsletter");
        return res.data.subscribers;
    };

    // =====================
    // Static Info Pages
    // =====================
    const getShippingPolicy = async () => {
        const res = await axios.get("/shipping");
        return res.data.policy;
    };
    const getReturnPolicy = async () => {
        const res = await axios.get("/returns");
        return res.data.policy;
    };
    const getFAQ = async () => {
        const res = await axios.get("/faq");
        return res.data.faq;
    };
    const getSupportInfo = async () => {
        const res = await axios.get("/support");
        return res.data.support;
    };
    // =====================
    // Banners
    // =====================
    const createBanner = async (data: Partial<Banner>) => {
        const res = await axios.post("/api/banners", data);
        return res.data.banner;
    };

    const getActiveBanners = async () => {
        const res = await axios.get("/api/banners");
        return res.data.banners;
    };

    const getAllBanners = async () => {
        const res = await axios.get("/api/banners/all");
        return res.data.banners;
    };

    const updateBanner = async (id: string, data: Partial<Banner>) => {
        const res = await axios.put(`/api/banners/${id}`, data);
        return res.data.banner;
    };

    const deleteBanner = async (id: string) => {
        await axios.delete(`/api/banners/${id}`);
    };

    // =====================
    // Socket Integration
    // =====================
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !socketRef.current) {
            socketRef.current = io(process.env.NEXT_PUBLIC_API_URL!, {
                auth: { token },
            });
        }

        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    return (
        <ApiContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                getProfile,
                getProducts,
                getProductById,
                addProduct,
                editProduct,
                deleteProduct,
                getCategories,
                getBrands,
                getCart,
                addToCart,
                removeFromCart,
                placeOrder,
                getOrders,
                trackOrder,
                requestReturn,
                getWishlist,
                addToWishlist,
                removeFromWishlist,
                getAdminStats,
                getRecentOrders,
                getTopProducts,
                addVendor,
                getVendors,
                getVendorById,
                submitContactMessage,
                getContactMessages,
                subscribeNewsletter,
                getNewsletterSubscribers,
                getShippingPolicy,
                getReturnPolicy,
                getFAQ,
                getSupportInfo,
                createBanner,
                getActiveBanners,
                getAllBanners,
                updateBanner,
                deleteBanner,
                socket: socketRef.current,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used within <ApiProvider>");
    }
    return context;
};
