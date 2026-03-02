"use client";

import React, { useState } from "react";
import { Modal, Tabs, Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "700"] });

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;


  const onLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok && data.userId) {
        sessionStorage.setItem("userId", data.userId.toString());
        message.success("Login successful!");
        onLoginSuccess(); 
        onClose(); 
        window.location.reload();
      } else {
        message.error("Login failed. Check your credentials.");
      }
    } catch (error) {
      message.error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Registration successful! Please login.");
      } else {
        message.error("Registration failed. User might already exist.");
      }
    } catch (error) {
      message.error("Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      className={sora.className}
    >
      <div className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-blue-600">Acceloka</h1>
        <p className="text-gray-400 text-[10px] tracking-widest uppercase">
          Member Portal
        </p>
      </div>

      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            key: "1",
            label: <span className="font-bold tracking-wider px-4">LOGIN</span>,
            children: (
              <Form onFinish={onLogin} layout="vertical" className="mt-4">
                <Form.Item name="username" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  className="font-bold h-12 mt-2 shadow-md border-none tracking-wider"
                >
                  Log In
                </Button>
              </Form>
            ),
          },
          {
            key: "2",
            label: (
              <span className="font-bold tracking-wider px-4">SIGN UP</span>
            ),
            children: (
              <Form onFinish={onRegister} layout="vertical" className="mt-4">
                <Form.Item name="fullName" rules={[{ required: true }]}>
                  <Input
                    prefix={<IdcardOutlined />}
                    placeholder="Full Name"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="username" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  className="border-none font-bold mt-2 font-sora! tracking-wider"
                >
                  Create Account
                </Button>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
}
