import { request } from "@/utils/apiClient";

export const formatTicketParams = (values: any) => {
  return {
    TicketName: values?.search || "",
    CategoryName: values?.category || "",
    TicketCode: values?.ticketCode || "",
    MaxPrice: values?.maxPrice || "",
    DateEventMin: values?.DateEventMin || "",
    DateEventMax: values?.DateEventMax || "",
    OrderBy: values?.sortBy || "TicketName",
    OrderState: values?.sortOrder || "asc",
    PageNumber: 1,
  };
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchAvailableTickets = async (params: any) => {
  const queryString = new URLSearchParams(params).toString();

  return request(`/api/v1/get-available-ticket?${queryString}`, { method: "GET" });
};

export const postBuyTicket = async (cartItems: any[]) => {
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  return request(`/api/v1/book-ticket`, {
    method: "POST",
    body: JSON.stringify({
      userId: userId ? parseInt(userId) : 0,
      bookings: cartItems,
    }),
  });
};

export const getBookedTickets = async (userId: string) => {
  return request(`/api/v1/get-all-booked-ticket?userId=${userId}`, {
    method: "GET"
  });
};

export const updateBooking = async (bookingId: string, updatingList: { ticketCode: string, quantity: number }[]) => {
  return request(`/api/v1/edit-booked-ticket/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify({ 
      updating: updatingList 
    }),
  });
}

export const deleteBooking = async (bookingId: string, kodeTicket: string, qty: number) => {
  return request(`/api/v1/revoke-ticket/${bookingId}/${kodeTicket}/${qty}`, {
    method: "DELETE",
  });
}