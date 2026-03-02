import React from "react";
import BookingDetail from "@/components/bookingDetail";
import { BarcodeOutlined } from "@ant-design/icons";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
});

export default function BookingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-6">
      <div className="w-8/12 bg-white items-center flex flex-col rounded-lg shadow-lg">
        <div className="bg-blue-950 w-full h-10 rounded-t-lg flex flex-row items-center gap-4 px-6 text-center">
          <BarcodeOutlined className="text-2xl text-white!" />
          <div className="flex flex-row items-center gap-2">
            <p className={`text-xl font-medium uppercase tracking-wider text-white mb-0! ${sora.className}`}>
              Booking ID:
            </p>
            <p className="text-xl font-bold text-white font-mono">
              ACC-7890-4567
            </p>
          </div>
        </div>
        <div className="p-6 w-full">
          <div className="border-l-6 border-blue-500 rounded-l-md">
            <div className="flex flex-row border border-l-0 border-lightblue rounded-l-none rounded-md">
              <div className="w-full border-r-2 border-lightblue px-6 py-2 mr-6">
                
                <p className={`text-gray-400 my-2 font-semibold text-xs ${sora.className} tracking-wider`}>CATEGORY NAME</p>
                <p className="text-gray-900 font-semibold text-3xl ">
                  General Admission
                </p>
              </div>
              <div className="mr-6 py-3 text-center ">
                <p className={`text-gray-400 mb-0! text-xs ${sora.className} tracking-wider`}>Qty</p>
                <p className="text-orange-600 font-semibold text-2xl mb-0!">
                  1
                </p>
                <p className={`text-gray-400 mb-0! text-xs ${sora.className} tracking-wider`}>Ticket</p>
              </div>
            </div>
          </div>
          <p className={`text-gray-400 mb-0! text-xs ${sora.className} my-4 tracking-wider`}>TICKET</p>
          <div className="border border-lightblue rounded-md">
            <BookingDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
