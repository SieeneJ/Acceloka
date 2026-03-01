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
  const { cart, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    message.success('Order placed successfully! Redirecting to payment...');

    setIsCartOpen(false);

    clearCart(); 
  };

  const handleFetchTickets = useCallback(
    async (values?: any, form?: FormInstance, page: number = 1) => {
      setLoading(true);
      setCurrentPage(page);

      const params = formatTicketParams(values);
      params.PageNumber = page;
      try {
        const response = await fetchAvailableTickets(params);

        if (!response.ok) {
          await handleBackendValidationErrors(response, form);
          setTickets([]);
          setTotalCount(0);
          return;
        }

        const data = await response.json();
        setTickets(data.tickets || data);
        setTotalCount(data.totalTickets || 0);
      } catch (error) {
        console.error("Network/Connection Error:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    handleFetchTickets();
  }, [handleFetchTickets]);

  return (
    <main className="min-h-screen w-full">
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
