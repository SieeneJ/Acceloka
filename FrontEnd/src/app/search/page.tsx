"use client";

import React, { useState, useEffect, useCallback } from "react";
import Hero from "@/components/hero/hero";
import SearchCard from "@/components/hero/searchCard";
import TicketList from "@/components/ticketList";
import { FormInstance, Form } from "antd";
import {
  formatTicketParams,
  fetchAvailableTickets,
} from "@/services/ticketService";
import { handleBackendValidationErrors } from "@/utils/formHelpers";

export default function SearchPage() {
  const [form] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleFetchTickets = useCallback(
    async (values?: any, form?: FormInstance, page: number = 1) => {
      setLoading(true);
      setCurrentPage(page);

      // 1. Prepare the params using the service helper
      const params = formatTicketParams(values);
      params.PageNumber = page;
      try {
        // 2. Call the API
        const response = await fetchAvailableTickets(params);

        // 3. Handle Errors (400, 422, etc)
        if (!response.ok) {
          await handleBackendValidationErrors(response, form);
          setTickets([]);
          setTotalCount(0);
          return;
        }

        // 4. Handle Success
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
        <SearchCard onSearch={handleFetchTickets} loading={loading} form={form}/>
      </div>

      <div className="max-w-11/12 mx-auto px-6 mt-12 pb-20">
        <hr className="mb-8 border-gray-200" />
        <TicketList
          tickets={tickets}
          loading={loading}
          total={totalCount}
          current={currentPage}
          onPageChange={(page) => {
            // We grab the form state so we don't lose the search filters
            const currentFormValues = form?.getFieldsValue();
            handleFetchTickets(currentFormValues, form, page);
          }}
        />
      </div>
    </main>
  );
}
