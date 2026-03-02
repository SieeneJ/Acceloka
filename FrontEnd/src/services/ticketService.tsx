// src/services/ticketService.ts
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

  const response = await fetch(
    `${baseUrl}/api/v1/get-available-ticket?${queryString}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );

  return response;
};

export const postBuyTicket = async (cartItems: any[]) => {
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  const payload = {
    userId: userId ? parseInt(userId) : 0,
    bookings: cartItems,
  };

  const response = await fetch(`${baseUrl}/api/v1/book-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};

export const updateBooking = async (bookingId: string, updatingList: { ticketCode: string, quantity: number }[]) => {
  const payLoad = {
    updating: updatingList
  };

  const response = await fetch(`${baseUrl}/api/v1/edit-booked-ticket/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payLoad),
  });

  return response;
}

export const deleteBooking = async (bookingId: string, kodeTicket: string, qty: number) => {
  const response = await fetch(`${baseUrl}/api/v1/revoke-ticket/${bookingId}/${kodeTicket}/${qty}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  return response
}