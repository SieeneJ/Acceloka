import { message } from "antd";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const request = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    if (response.ok) {
      return response;
    }

    const errorData = await response.json();
    let errorMessage = "";

    if (errorData.errors) {
      errorMessage = Object.values(errorData.errors).flat().join(". ");
    }

    if (!errorMessage && errorData.detail) {
      errorMessage = errorData.detail;
    }

    if (!errorMessage) {
      errorMessage = errorData.title || "An unexpected error occurred";
    }

    message.error(errorMessage);
    return response;
    
  } catch (error) {
    console.error("API Request Error:", error);
    message.error("Network error. Please check your connection.");
    return { ok: false } as Response;
  }
};
