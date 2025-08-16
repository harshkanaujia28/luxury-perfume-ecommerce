import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://luxury-perfume-ecommerce.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Removed withCredentials: true – not needed for token auth
});

// Automatically attach token
instance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Graceful 401 handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

      // Sirf protected pages par hi redirect kare
      const protectedPaths = ["/checkout", "/account", "/orders"];
      const isProtected = protectedPaths.some((path) => currentPath.startsWith(path));

      if (isProtected && !currentPath.includes("/login")) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);


export default instance;
