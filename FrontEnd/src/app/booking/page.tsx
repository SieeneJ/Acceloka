"use client";

import React, { useState, useEffect } from "react";
import BookingDetail from "@/components/bookingDetail";
import {
  BarcodeOutlined,
  FrownOutlined,
  UpCircleFilled,
  DownCircleFilled,
} from "@ant-design/icons";
import { Sora } from "next/font/google";
import { message, Spin } from "antd";
import { useRouter } from "next/navigation";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
});

interface Ticket {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  quantity: number;
}

interface Category {
  categoryName: string;
  qtyPerCategory: number;
  tickets: Ticket[];
}

interface BookingGroup {
  bookedTicketId: string;
  categories: Category[];
}

export default function BookingPage() {
  const router = useRouter();
  const [bookingGroups, setBookingGroups] = useState<BookingGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        message.warning("Login first!");
        setBookingGroups([]);
        return;
      }

      const response = await fetch(
        `${baseUrl}/api/v1/get-all-booked-ticket?userId=${userId}`,
      );
      if (!response.ok) throw new Error("Failed to get data.");

      const result = await response.json();

      setBookingGroups(result || []);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center bg-gray-100 px-6 py-10 gap-8 ${sora.variable}`}
    >
      <div className="w-full flex flex-col items-center gap-4 mt-30!">
        {bookingGroups.length > 0 ? (
          bookingGroups.map((group, groupIndex) => (
            <div
              key={group.bookedTicketId || groupIndex}
              className="w-8/12 bg-white items-center flex flex-col rounded-lg shadow-lg overflow-hidden "
            >
              <div
                className={`flex bg-blue-950 w-full justify-between items-center px-6  transition-all duration-500  ${
                  openGroups[group.bookedTicketId] === true
                    ? "h-10 rounded-t-lg  flex-row  gap-4 "
                    : "h-16 flex "
                }`}
              >
                <div className="flex flex-row gap-2">
                  <BarcodeOutlined className="text-2xl text-white!" />
                  <div className="flex flex-row items-center gap-2">
                    <p
                      className={`text-xl font-medium uppercase tracking-wider text-white mb-0! ${sora.className}`}
                    >
                      Booking ID:
                    </p>
                    <p className="text-xl font-bold text-white mb-0!">
                      {group.bookedTicketId}
                    </p>
                  </div>
                </div>
                <button
                  className="collapse-btn"
                  onClick={() =>
                    setOpenGroups((prev) => ({
                      ...prev,
                      [group.bookedTicketId]: !prev[group.bookedTicketId],
                    }))
                  }
                >
                  {openGroups[group.bookedTicketId] !== false ? (
                    <UpCircleFilled className="text-white!" />
                  ) : (
                    <DownCircleFilled className="text-white!" />
                  )}
                </button>
              </div>
              {openGroups[group.bookedTicketId] === true && (
                <div className="p-6 w-full flex flex-col gap-4 transition-all duration-300">
                  {group.categories.map((cat, catIndex) => (
                    <div key={catIndex} className="w-full">
                      <div className="border-l-6 border-blue-500 rounded-l-md">
                        <div className="flex flex-row border border-l-0 border-lightblue rounded-l-none rounded-md">
                          <div className="w-full border-r-2 border-lightblue px-6 py-2 mr-6">
                            <p
                              className={`text-gray-400 my-2 font-semibold text-xs ${sora.className} tracking-wider`}
                            >
                              CATEGORY NAME
                            </p>
                            <p className="text-gray-900 font-semibold text-3xl mb-0!">
                              {cat.categoryName}
                            </p>
                          </div>
                          <div className="mr-6 py-3 text-center ">
                            <p
                              className={`text-gray-400 mb-0! text-xs ${sora.className} tracking-wider`}
                            >
                              Qty
                            </p>
                            <p className="text-orange-600 font-semibold text-2xl mb-0!">
                              {cat.qtyPerCategory}
                            </p>
                            <p
                              className={`text-gray-400 mb-0! text-xs ${sora.className} tracking-wider`}
                            >
                              Ticket
                            </p>
                          </div>
                        </div>
                      </div>

                      <p
                        className={`text-gray-400 mb-0! text-xs ${sora.className} my-2 tracking-wider`}
                      >
                        TICKET
                      </p>
                      <div className="border border-lightblue rounded-md">
                        <BookingDetail
                          dataSource={cat.tickets}
                          bookedTicketId={group.bookedTicketId}
                          onRefresh={fetchMyBookings}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-8/12 bg-white flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-950 w-full h-10 flex flex-row items-center gap-4 px-6">
              <BarcodeOutlined className="text-2xl text-white!" />
              <p className="text-xl font-medium uppercase tracking-wider text-white mb-0!">
                My Bookings
              </p>
            </div>

            <div className="py-20 w-full flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <FrownOutlined className="text-5xl text-gray-200" />
              </div>
              <h3 className="text-gray-500 font-bold text-xl uppercase tracking-widest">
                No Bookings Found
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                You haven't purchased any tickets yet. Your booking history will
                appear here.
              </p>
              <button
                onClick={() => router.push("/search")}
                className="mt-6 px-6 py-2 bg-orange-600! text-white! rounded-md font-medium text-xs hover:bg-orange-700! transition-all tracking-widest"
              >
                EXPLORE TICKETS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
