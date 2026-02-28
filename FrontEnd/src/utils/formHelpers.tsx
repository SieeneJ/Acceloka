import { FormInstance } from "antd";

export const handleBackendValidationErrors = async (
  response: Response,
  form: FormInstance | undefined
) => {
  try {
    const errorData = await response.json();

    if (errorData.errors && form) {
      const formErrors = Object.keys(errorData.errors).map((key) => ({
        name: 
          key === "TicketName" ? "search" :
          key === "CategoryName" ? "category" :
          key === "TicketCode" ? "ticketCode" :
          key === "MaxPrice" ? "maxPrice" :
          key === "DateEventMin" ? "startDate" :
          key === "DateEventMax" ? "endDate" :
          key.toLowerCase(),
        errors: errorData.errors[key],
      }));

      form.setFields(formErrors);
    }
  } catch (e) {
    console.error("Failed to parse API error response:", e);
  }
};