import React from "react";
import { Tag, Button, Typography, Space, Spin, Empty, Pagination } from "antd";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  FireOutlined,
  ClockCircleOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function TicketList({
  tickets,
  loading,
  total,
  current,
  onPageChange,
}: {
  tickets: any[];
  loading: boolean;
  total: number;
  current: number;
  onPageChange: (page: number) => void;
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
              key={`${ticket.ticketId || ticket.Id || "ticket"}-${index}`}
              className="bg-white rounded-lg border border-[#f0f0f0] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col "
              style={{ opacity: isSoldOut ? 0.7 : 1 }}
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between mb-4 items-start gap-2">
                  <Title
                    level={4}
                    style={{ margin: 0, fontWeight: 600, width: "70%" }}
                  >
                    {ticket.ticketName}
                  </Title>
                  <Tag
                    color="blue"
                    style={{ borderRadius: "4px", marginRight: 0 }}
                  >
                    {ticket.categoryName}
                  </Tag>
                </div>

                <div className=" flex items-center">
                  <BarcodeOutlined className="mr-2 text-gray-400" />
                  <Text
                    type="secondary"
                    style={{ fontSize: "11px", fontFamily: "monospace" }}
                  >
                    {ticket.ticketCode || "N/A"}
                  </Text>
                </div>

                <Space orientation="vertical" size={2} className="w-full mb-2">
                  <Text
                    type="secondary"
                    style={{ fontSize: "12px" }}
                    className="flex items-center"
                  >
                    <CalendarOutlined className="mr-2 text-blue-500" />
                    {new Date(ticket.eventDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
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
                      className="w-full text-center py-1 font-bold border-none"
                      style={{ backgroundColor: "#fff2e8" }}
                    >
                      <FireOutlined /> ONLY {remaining} TICKETS LEFT!
                    </Tag>
                  ) : (
                    <div className="flex items-center text-gray-500 text-xs">
                      <InfoCircleOutlined className="mr-2 text-blue-400" />
                      <Text type="secondary">
                        {remaining} tickets available
                      </Text>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center border-t border-gray-100">
                  <div className="flex flex-col">
                    <Text
                      type="secondary"
                      className="text-[11px] uppercase tracking-wider"
                    >
                      Price
                    </Text>
                    <Text strong className="text-blue-600 text-lg">
                      IDR {ticket.price?.toLocaleString()}
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    className="bg-blue-600"
                    disabled={isSoldOut}
                    size="middle"
                  >
                    {isSoldOut ? "Sold Out" : "Book Now"}
                  </Button>
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
            pageSize={10} // IMPORTANT: Change this to whatever your backend "limit" is!
            onChange={onPageChange}
            showSizeChanger={false}
            align="center"
          />
        </div>
      )}
    </div>
  );
}
