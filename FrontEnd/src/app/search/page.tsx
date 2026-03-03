"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import Hero from "@/components/hero/hero";
import SearchCard from "@/components/hero/searchCard";
import TicketList from "@/components/ticketList";
import { FormInstance, Form, message } from "antd";
import {
  formatTicketParams,
  fetchAvailableTickets,
  postBuyTicket,
} from "@/services/ticketService";
import { handleBackendValidationErrors } from "@/utils/formHelpers";
import CartButton from "@/components/cartButton";
import CartDrawer from "@/components/cartDrawer";
export default function SearchPage() {
  const [form] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, addToCart} = useCart();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      message.warning("Cart is Empty!");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      message.error("Please login first to book a ticket!");
      return;
    }

    const response = await postBuyTicket(cart);

    if (response && response.ok) {
      message.success("Tickets have been booked!!");
      clearCart();
      setIsCartOpen(false);
    }
  };

  const handleFetchTickets = useCallback(
    async (values?: any, form?: FormInstance, page: number = 1) => {
      setLoading(true);
      setCurrentPage(page);

      const params = formatTicketParams(values);
      params.PageNumber = page;

      const response = await fetchAvailableTickets(params);

      if (response && response.ok) {
        const data = await response.json();
        setTickets(data.tickets || data);
        setTotalCount(data.totalTickets || 0);
      } else if (response) {
        await handleBackendValidationErrors(response, form);
        setTickets([]);
        setTotalCount(0);
      }

      setLoading(false);
    },
    [],
  );

  useEffect(() => {
    handleFetchTickets();
  }, [handleFetchTickets]);

  return (
    <main className="min-h-screen w-full bg-white text-black">
      <Hero />

      <div className="max-w-11/12 mx-auto px-6 -mt-32 relative z-10">
        <SearchCard
          onSearch={handleFetchTickets}
          loading={loading}
          form={form}
        />
      </div>

      <div className="max-w-11/12 mx-auto px-6 mt-12 pb-20">
        <hr className="mb-8 border-gray-200" />
        <TicketList
          tickets={tickets}
          loading={loading}
          total={totalCount}
          current={currentPage}
          onPageChange={(page) => {
            const currentFormValues = form?.getFieldsValue();
            handleFetchTickets(currentFormValues, form, page);
          }}
          onBook={addToCart}
        />
      </div>

      <CartButton 
        count={cart.length} 
        onClick={() => setIsCartOpen(true)} 
      />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </main>
  );
}
