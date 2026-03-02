import React from "react";
import { Tag, Button, Space, Spin, Empty, Pagination } from "antd";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  FireOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";

export default function TicketList({
  tickets,
  loading,
  total,
  current,
  onPageChange,
  onBook,
}: {
  tickets: any[];
  loading: boolean;
  total: number;
  current: number;
  onPageChange: (page: number) => void;
  onBook: (ticket: any) => void;
}) {
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  if (!tickets || tickets.length === 0)
    return <Empty description="No tickets found" />;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket, index) => {
          const remaining = ticket.quota ?? 0;
          const isLowStock = remaining > 0 && remaining <= 20;
          const isSoldOut = remaining <= 0;

          return (
            <div
              key={`${ticket.ticketCode || "ticket"}-${index}`}
              className={`bg-white rounded-lg border border-[#f0f0f0] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col ${isSoldOut ? "opacity-70" : ""}`}
            >
              <div className="flex  pl-2 bg-linear-to-b from-blue-500 to-blue-200 ">
                <div className="p-5 flex-1 flex flex-col bg-white">
                  <div className="flex justify-between mb-2 items-start gap-2">
                    <p className="m-0! font-semibold w-70% text-lg">
                      {ticket.ticketName}
                    </p>
                    <Tag color="blue" className="rounded-sm mr-0! font-bold!">
                      {ticket.categoryName}
                    </Tag>
                  </div>

                  <div className=" flex items-center">
                    <BarcodeOutlined className="mr-2 text-gray-500!" />
                    <p className="text-xs mb-0! text-gray-600 italic">
                      {ticket.ticketCode || "N/A"}
                    </p>
                  </div>

                  <Space orientation="vertical" size={2} className="w-full mb-2">
                    <p className="flex text-xs mb-0! text-gray-500">
                      <CalendarOutlined className="mr-2 w-4" />
                      {new Date(ticket.eventDate).toLocaleDateString("en-EN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </Space>

                  <div className=" mt-auto">
                    {isSoldOut ? (
                      <Tag
                        color="default"
                        className="w-full text-center py-1 font-bold"
                      >
                        SOLD OUT
                      </Tag>
                    ) : isLowStock ? (
                      <Tag
                        color="volcano"
                        className="w-full text-center py-1 font-bold border-none bg-orange-50"
                      >
                        <FireOutlined /> ONLY {remaining} TICKETS LEFT!
                      </Tag>
                    ) : (
                      <div className="flex items-center text-gray-500 text-xs mb-1">
                        <InfoCircleOutlined className="mr-2 text-blue-400" />
                        <p className="mb-0! text-gray-700">
                          {remaining} tickets available
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center border-t border-dashed border-gray-300">
                    <div className="flex flex-col">
                      <p className="text-xs uppercase tracking-wider mt-1! mb-0! text-gray-500">
                        Price
                      </p>
                      <p className="text-blue-600 text-lg font-semibold mb-0!">
                        IDR {ticket.price?.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      type="primary"
                      className="bg-orange-600! hover:bg-orange-700! transition-colors font-bold!"
                      disabled={isSoldOut}
                      size="middle"
                      onClick={() => onBook(ticket)}
                    >
                      {isSoldOut ? "Sold Out" : "Book Now"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {total > 0 && (
        <div className="flex justify-center pt-8 border-t border-gray-100">
          <Pagination
            current={current}
            total={total}
            pageSize={10}
            onChange={onPageChange}
            showSizeChanger={false}
            align="center"
          />
        </div>
      )}
    </div>
  );
}
