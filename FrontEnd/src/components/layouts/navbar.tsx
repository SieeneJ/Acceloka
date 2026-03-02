"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModal from "../authModal";
import { useAuth } from "@/hooks/useAuth";
import Dropdown from "antd/es/dropdown/dropdown";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { MenuProps } from "antd/es/menu/menu";
import HistoryOutlined from "@ant-design/icons/lib/icons/HistoryOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";

const links = [
  { label: "Search ticket", path: "/search" },
  { label: "My Booking", path: "/booking" },
];

export default function AccelokaNavbar() {
  const pathname = usePathname();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isLoggedIn, logout, checkAuth } = useAuth();

  const handleUserClick = () => {
    if (isLoggedIn) {
      window.location.href = "/booking";
    } else {
      setIsAuthOpen(true);
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "My Bookings",
      icon: <HistoryOutlined />,
      onClick: () => (window.location.href = "/booking"),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <div
      className={
        "flex items-center gap-3 px-12 py-10 font-(family-name:--font-schibsted)"
      }
    >
      {/* Pill Navbar */}
      <nav className="flex flex-1 items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 shadow-lg backdrop-blur-md">
        <span className="mr-2 text-3xl font-medium text-blue-600 tracking-tight whitespace-nowrap">
          Acceloka
        </span>

        <div className="flex flex-1 items-center justify-center gap-2 pr-20">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-full px-5 py-2 text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600!"
                    : "text-gray-500 hover:bg-black/5 hover:text-gray-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {isLoggedIn ? (
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <button
            style={{ backgroundColor: "#dcfce7" }}
            className="h-10 w-10 rounded-full  cursor-pointer border-none"
          >
            <UserOutlined className="flex items-center h-10 w-10 rounded-full text-lg" />
          </button>
        </Dropdown>
      ) : (
        <button
          onClick={() => setIsAuthOpen(true)}
          className="h-10 w-10 bg-blue-100 rounded-full cursor-pointer border-none"
        >
          <UserOutlined className="rounded-full text-lg" />
        </button>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={checkAuth}
      />
    </div>
  );
}
