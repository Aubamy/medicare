import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlishContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <AuthProvider>
     <CartProvider>
        <WishlistProvider>
         <App />
       </WishlistProvider>
     </CartProvider>
   </AuthProvider>
  </StrictMode>
);