import React from "react";
import { Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface CartButtonProps {
  count: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ count, onClick }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Badge count={count} offset={[-5, 5]} showZero={false} color="#f5222d">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<ShoppingCartOutlined className="text-2xl"/>}
          className="h-16 w-16 shadow-2xl bg-blue-600 hover:scale-110 transition-transform duration-200 flex items-center justify-center border-none"
          onClick={onClick}
        />
      </Badge>
    </div>
  );
};

export default CartButton;