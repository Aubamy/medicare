
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";
import api from "../api/axios";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  increaseQuantity: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Convert backend cart item to frontend cart item
  const formatCartItem = (item: any): CartItem => {
    const product = item.Product || item.product;

    return {
      id: product.id || item.productId,
      name: product.productName || product.name,
      description: product.description || "",
      price: Number(product.price),
      image: product.image || "",
      category: product.category || "",
      quantity: Number(item.quantity),
      rating: Number(product.rating || 0),
    };
  };

  // Load cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem("medicare-token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/cart");

      const data = response.data;

      if (Array.isArray(data)) {
        setCart(data.map(formatCartItem));
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add product to backend cart
  const addToCart = async (product: Product) => {
    try {
      setLoading(true);

      await api.post("/cart/add", {
        productId: product.id,
        quantity: 1,
      });

      await fetchCart();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove product from backend cart
  const removeFromCart = async (productId: number) => {
    try {
      setLoading(true);

      await api.delete(`/cart/${productId}`);

      setCart((currentCart) =>
        currentCart.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Increase quantity
  const increaseQuantity = async (productId: number) => {
    const item = cart.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item) return;

    try {
      const newQuantity = item.quantity + 1;

      await api.put(`/cart/${productId}`, {
        quantity: newQuantity,
      });

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem.id === productId
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem
        )
      );
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      throw error;
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId: number) => {
    const item = cart.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item) return;

    try {
      const newQuantity = item.quantity - 1;

      if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await api.put(`/cart/${productId}`, {
        quantity: newQuantity,
      });

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem.id === productId
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem
        )
      );
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      throw error;
    }
  };

  // Clear frontend cart
  // Backend cart will be cleared after successful payment verification.
  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};
