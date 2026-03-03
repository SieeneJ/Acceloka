import React from "react";
import { Drawer, Button, Space, Empty } from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface CartItem {
  ticketCode: string | number;
  ticketName: string;
  categoryName: string;
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => Promise<void>;
}

export default function CartDrawer({
  open,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const totalPrice = (items || []).reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  return (
    <Drawer
      title={
        <Space>
          <ShoppingCartOutlined className="text-blue-500" />
          <span>Your Cart ({items.length})</span>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={open}
      size={450}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div 
                key={`${item.ticketCode}-${index}`}
                className="flex justify-between items-start p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <h4 className="text-base font-bold text-gray-800 mb-0!">
                    {item.ticketName}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mb-2">
                    {item.categoryName}
                  </p>
                  <p className="text-lg font-bold text-blue-600 mb-0!">
                    IDR {item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-5 ml-4">
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => onRemove(index)}
                    className="hover:bg-red-50 rounded-full"
                  />

                  <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                    <Button
                      type="text"
                      size="small"
                      icon={<MinusOutlined />}
                      onClick={() => onUpdateQuantity(index, -1)}
                      disabled={item.quantity <= 1}
                      className="flex items-center justify-center"
                    />
                    <span className="w-8 text-center font-bold text-gray-700">
                      {item.quantity}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => onUpdateQuantity(index, 1)}
                      className="flex items-center justify-center"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <Empty description="Your cart is empty" />
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-gray-100 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl text-center m-0!">Total Amount</p>
            <p className="text-blue-600 font-bold text-lg mb-0!">
              IDR {totalPrice.toLocaleString()}
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            block
            className="bg-orange-700! rounded-lg hover:bg-orange-800! transition-colors"
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            Checkout Now
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
