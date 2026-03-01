import React from "react";
import { Drawer, List, Button, Space } from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface CartItem {
  ticketId: string | number;
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
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  items,
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
        <div className="flex-1 flex-col overflow-y-auto p-4">
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => (
              <List.Item
                className="relative"
                actions={[
                  <div key="actions" className="flex flex-col items-end">
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => onRemove(index)}
                      className="hover:bg-red-50"
                    />

                    <Space className="bg-gray-50 p-1 rounded-lg">
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => onUpdateQuantity(index, -1)}
                        disabled={item.quantity <= 1}
                      />
                      <p className="w-4 mb-0!">{item.quantity}</p>
                      <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => onUpdateQuantity(index, 1)}
                      />
                    </Space>
                  </div>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <h1 className="text-lg font-bold mb-0!">
                      {item.ticketName}
                    </h1>
                  }
                  description={
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-500 mb-0! font-semibold">
                        {item.categoryName}
                      </p>
                      <p className="font-semibold text-blue-600 text-xl">
                        IDR {item.price.toLocaleString()}
                      </p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
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
