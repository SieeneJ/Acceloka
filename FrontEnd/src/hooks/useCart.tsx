import { useState } from "react";
import { message } from "antd";

export const useCart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (ticket: any) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.ticketCode === ticket.ticketCode,
      );
      if (existing) {
        return prev.map((item) =>
          item.ticketCode === ticket.ticketCode
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...ticket, quantity: 1 }];
    });
    message.success(`${ticket.ticketName} has been added to cart!`);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
