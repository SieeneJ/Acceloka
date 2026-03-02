"use client";

import React from "react";
import { Flex, Space, Table, Tag, Button } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  code: string;
  date: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Ticket Name",
    dataIndex: "name",
    key: "name",
    width: '55%',
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
    dataIndex: "code",
    key: "code",
    render: (code: string) => (
      <span className="text-blue-600 bg-lightblue rounded-md px-1 py-0.5 text-sm font-semibold">{code}</span>
    )
  },
  {
    title: "Event Date",
    dataIndex: "date",
    key: "date",
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
          onClick={() => console.log("Edit clicked for record:", record)}
        />
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => console.log("Delete clicked for record:", record)}
          className="hover:bg-red-50"
        />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    code: "Acc-1234",
    date: "2026/03/6",
  },
  {
    key: "2",
    name: "Jim Green",
    code: "Acc-2345",
    date: "2026/03/7",
  },
  {
    key: "3",
    name: "Joe Black",
    code: "Acc-3456",
    date: "2026/03/8",
  },
];

const bookingDetail: React.FC = () => (
  <Table<DataType>
    className={"[&_td]:py-1.5! [&_th]:py-2! [&_th]:text-gray-500! [&_th]:tracking-wider"}
    columns={columns}
    dataSource={data}
    pagination={false}
  />
);

export default bookingDetail;
