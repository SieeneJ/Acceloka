"use client";

import React from "react";
import { Space, Table, Button, Modal, message, InputNumber } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { updateBooking, deleteBooking } from "@/services/ticketService";

interface TicketDetail {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  quantity: number;
}

interface BookingDetailProps {
  dataSource: any[];
  bookedTicketId: string;
  onRefresh: () => void; 
}

const handleUpdate = (bookedTicketId: string, record: TicketDetail, onRefresh: () => void) => {
  let currentQty = record.quantity;
  Modal.confirm({
    title: "Update Quantity",
    icon: <EditOutlined />,
    content: (
      <div className="py-4">
        <p className="mb-2">New quantity for {record.ticketName}:</p>
        <InputNumber 
          min={1} 
          defaultValue={record.quantity} 
          onChange={(val) => currentQty = val || 1} 
          className="w-full" 
        />
      </div>
    ),
    onOk: async () => {
      const res = await updateBooking(bookedTicketId, [
        { 
          ticketCode: record.ticketCode, 
          quantity: currentQty 
        }
      ]);

      if (res.ok) {
        message.success("Updated");
        onRefresh();
      } else {
        message.error("Update failed");
      }
    },
  });
};

const handleDelete = (bookedTicketId: string, record: TicketDetail, onRefresh: () => void) => {
  let qtyToRemove = 1;
  Modal.confirm({
    title: "Revoke Ticket",
    icon: <ExclamationCircleOutlined />,
    content: (
      <div className="py-4">
        <p className="mb-2 text-gray-600">
          Berapa banyak tiket <strong>{record.ticketName}</strong> yang ingin dibatalkan?
        </p>
        <p className="text-xs text-gray-400 mb-2 italic">Maksimal: {record.quantity}</p>
        <InputNumber 
          min={1} 
          max={record.quantity} 
          defaultValue={1} 
          onChange={(val) => qtyToRemove = val || 1} 
          className="w-full"
        />
      </div>
    ),
    okType: "danger",
    onOk: async () => {
      const res = await deleteBooking(bookedTicketId, record.ticketCode, qtyToRemove);
      if (res.ok) {
        message.success("Revoked");
        onRefresh();
      }
    },
  });
};

const columns= (bookedTicketId: string, onRefresh: () => void):TableProps<TicketDetail>["columns"] => [
  {
    title: "Ticket Name",
    dataIndex: "ticketName",
    key: "name",
    width: '40%',
    render: (name: string, record: any, index: number) => (
      <div className="flex gap-3">
        <span className="text-blue-600 text-xs min-w-5 bg-lightblue rounded-md px-1 py-0.5 text-center font-bold">
          {index + 1}
        </span>

        <div className="flex flex-col">
          <span className="font-bold text-gray-800">{name}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Ticket Code",
    dataIndex: "ticketCode",
    key: "code",
    width: "25%",
    render: (code: string) => (
      <span className="inline-block text-blue-600 min-w-5 bg-lightblue rounded-md px-1 py-0.5 text-sm font-semibold">{code}</span>
    )
  },
  {
    title: "Event Date",
    dataIndex: "eventDate",
    key: "date",
    width: "20%",
    render: (eventDate: string) => {
      return new Date(eventDate).toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    key: "qty",
    render: (qty: number) => (
      <span className="text-blue-600 text-xs min-w-5 bg-lightblue rounded-md px-1 py-0.5 text-center font-bold">{qty}</span>
    )
  },
  {
    title: "Action",
    key: "action",
    width: "10%",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="text"
          size="small"
          className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          icon={<EditOutlined />}
          onClick={() => handleUpdate(bookedTicketId, record, onRefresh)}
        />
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(bookedTicketId, record, onRefresh)}
          className="hover:bg-red-50"
        />
      </Space>
    ),
  },
];


const BookingDetail: React.FC<BookingDetailProps> = ({ dataSource, bookedTicketId, onRefresh }) => {  
  return (
    <Table<TicketDetail>
      className={"[&_td]:py-1.5! [&_th]:py-2! [&_th]:text-gray-500! [&_th]:tracking-wider"}
      columns={columns(bookedTicketId, onRefresh)}
      dataSource={dataSource}
      pagination={false}
      rowKey="ticketCode"
    />
  );
}

export default BookingDetail;
