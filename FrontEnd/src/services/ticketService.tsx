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

export const fetchAvailableTickets = async (params: any) => {
  const queryString = new URLSearchParams(params).toString();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const response = await fetch(
    `${baseUrl}/api/v1/get-available-ticket?${queryString}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  
  return response;
};