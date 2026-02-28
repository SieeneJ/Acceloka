"use client";
import React from "react";

import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import {
  Input,
  DatePicker,
  Space,
  Select,
  Form,
  Slider,
  SliderSingleProps,
  Radio,
  Button,
  FormInstance,
} from "antd";
import "antd/dist/reset.css";

const { RangePicker } = DatePicker;
const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
  value,
) => {
  if (value === undefined) return "";

  const formattedValue = value.toLocaleString("id-ID");

  return `Rp ${formattedValue}`;
};

interface SearchCardProps {
  onSearch: (values: any, form: FormInstance, page?: number) => void;
  loading: boolean;
  form: FormInstance;
}

const SearchCard: React.FC<SearchCardProps> = ({
  onSearch,
  loading,
  form,
}: any) => {
  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      DateEventMin: values.startDate
        ? values.startDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]")
        : "",
      DateEventMax: values.endDate
        ? values.endDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]")
        : "",
    };

    console.log("📤 SearchCard sending to Page:", payload);
    onSearch(payload, form);
  };

  return (
    <Form
      form={form}
      className="w-full max-w-full mx-auto bg-white rounded-lg shadow-md p-6"
      onFinish={handleFinish}
      layout="vertical"
    >
      <div className="grid pt-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
          <div className="col-span-4 flex flex-col">
            <Form.Item
              name="search"
              label={<span className="text-base font-semibold">Search</span>}
            >
              <Input
                placeholder="search..."
                size="large"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col col-span-3">
            <Form.Item
              name="category"
              label={<span className="text-base font-semibold">Category</span>}
            >
              <Select
                showSearch={{ optionFilterProp: "label" }}
                placeholder="Select a category"
                className="bg-input w-full border-lightblue border rounded-md"
                size="large"
                options={[
                  { value: "", label: "All" },
                  { value: "Concert", label: "Concert" },
                  { value: "Hotel", label: "Hotel" },
                  { value: "Cinema", label: "Cinema" },
                  { value: "Transportasi Darat", label: "Train" },
                  { value: "Transportasi Udara", label: "Flight" },
                  { value: "Transportasi Laut", label: "Boat" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <Form.Item
              name="ticketCode"
              label={
                <span className="text-base font-semibold">Ticket Code</span>
              }
            >
              <Input placeholder="Enter ticket code..." size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
          <div className="flex col-span-2 gap-2">
            <Form.Item
              name="startDate"
              label={
                <span className="font-bold text-gray-700">Start Date</span>
              }
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="From"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="endDate"
              label={<span className="font-bold text-gray-700">End Date</span>}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="To"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col col-span-2">
            <Form.Item
              name="maxPrice"
              label={<span className="font-semibold">Max Price</span>}
            >
              <Slider
                min={0}
                max={10000000}
                step={10000}
                tooltip={{ formatter }}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col col-span-2">
            <Form.Item
              name="sortBy"
              label={<span className="font-semibold">Sort By</span>}
            >
              <Select
                showSearch={{ optionFilterProp: "label" }}
                placeholder="Name"
                className="bg-input w-full border-lightblue border rounded-md"
                size="large"
                options={[
                  { value: "ticketName", label: "Ticket Name" },
                  { value: "ticketCode", label: "Ticket Code" },
                  { value: "categoryName", label: "Category" },
                  { value: "price", label: "Price" },
                  { value: "eventDate", label: "Event Date" },
                ]}
              ></Select>
            </Form.Item>
          </div>
          <div className="flex flex-col justify-end">
            <Form.Item
              name="sortOrder"
              label={<span className="font-semibold">Order</span>}
            >
              <Radio.Group
                optionType="button"
                size="large"
                className="flex w-full"
              >
                <Radio.Button value="asc">
                  <ArrowUpOutlined />
                </Radio.Button>
                <Radio.Button value="desc">
                  <ArrowDownOutlined />
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex flex-col mt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchCard;
