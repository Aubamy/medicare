import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export const WishlistProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("medicare-wishlist");

    if (!savedWishlist) {
      return [];
    }

    try {
      return JSON.parse(savedWishlist);
    } catch (error) {
      console.error("Invalid wishlist data:", error);
      return [];
    }
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "medicare-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((current) => {
      const alreadyExists = current.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return current;
      }

      return [...current, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((current) =>
      current.filter((item) => item.id !== productId)
    );
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((current) => {
      const alreadyExists = current.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return current.filter(
          (item) => item.id !== product.id
        );
      }

      return [...current, product];
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};