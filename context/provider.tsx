"use client";
import products from "@/constants/data.json";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

// Extend CartItem to include name, subtotal, and image
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number; // Add subtotal property
  image: string; // Add image property
}

interface CartContextType {
  cart: CartItem[];
  addItemToCart: (itemId: string) => void;
  removeItemFromCart: (itemId: string) => void;
  increaseItemQuantity: (itemId: string) => void;
  decreaseItemQuantity: (itemId: string) => void;
  confirmOrder: () => void;
  resetOrder: () => void;
  showOrderConfirmation: boolean;
  totalQuantity: number;
  totalPrice: number; // Add totalPrice property
  isItemInCart: (itemId: string) => boolean; // Add isItemInCart function
  getItemQuantity: (itemId: string) => number; // Add getItemQuantity function
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  confirmOrder: () => {},
  resetOrder: () => {},
  showOrderConfirmation: false,
  totalQuantity: 0,
  totalPrice: 0, // Default value
  isItemInCart: () => false, // Default function
  getItemQuantity: () => 0, // Default function
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  // Function to get product by ID
  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  // Function to calculate total quantity of items
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to calculate total price of items
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const addItemToCart = (itemId: string) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === itemId);
      const product = getProductById(itemId);
      if (!product) return prevCart;

      if (itemIndex !== -1) {
        // Item already in cart, increase quantity and update subtotal
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        updatedCart[itemIndex].subtotal =
          updatedCart[itemIndex].quantity * updatedCart[itemIndex].price;
        return updatedCart;
      } else {
        // Add new item to cart with price, name, image (thumbnail), and subtotal
        const { price, name, image } = product;
        return [
          ...prevCart,
          {
            id: itemId,
            name,
            quantity: 1,
            price,
            subtotal: price,
            image: image.thumbnail, // Use thumbnail image
          },
        ];
      }
    });
  };

  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const increaseItemQuantity = (itemId: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      );
    });
  };

  const decreaseItemQuantity = (itemId: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price,
            }
          : item
      );
    });
  };

  const confirmOrder = () => {
    setShowOrderConfirmation(true);
  };

  const resetOrder = () => {
    setCart([]);
    setShowOrderConfirmation(false);
  };

  // Function to check if an item is in the cart
  const isItemInCart = (itemId: string) => {
    return cart.some((item) => item.id === itemId);
  };

  // Function to get the quantity of an item in the cart
  const getItemQuantity = (itemId: string) => {
    const item = cart.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    confirmOrder,
    resetOrder,
    showOrderConfirmation,
    totalQuantity: calculateTotalQuantity(),
    totalPrice: calculateTotalPrice(), // Calculate and provide total price
    isItemInCart, // Provide the isItemInCart function
    getItemQuantity, // Provide the getItemQuantity function
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
