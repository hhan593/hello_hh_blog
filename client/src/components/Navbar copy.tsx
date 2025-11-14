import { useState } from "react";
import HHImage from "./HHImage";
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth"; // 确保引入了logout函数
import {
  Button,
  Popover,
  Space,
  Avatar,
  Divider,
  Typography,
  Badge,
  
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

// 封装Popover的内容组件
const UserProfileContent = ({ onLogout }) => {
  // 假设有消息通知数据
  const notifications = [
    { id: 1, type: "comment", content: "小明评论了你的文章", read: false },
    { id: 2, type: "like", content: "小红点赞了你的帖子", read: true },
  ];

  // 未读消息数量
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ width: 300 }}>
      {/* 用户信息区域 */}
      <div className="flex items-center p-4">
        <Badge count={unreadCount} offset={[-10, 10]}>
          <Avatar size={64} icon={<UserOutlined />} className="bg-blue-500" />
        </Badge>
        <div className="ml-4">
          <Text strong className="text-lg">
            王小明
          </Text>
          <p className="text-gray-500">user@example.com</p>
          <p className="mt-1">
            <Badge status="success" text="在线" />
          </p>
        </div>
      </div>

      <Divider className="my-2" />

      {/* 消息通知区域 */}
      <div className="p-2 max-h-48 overflow-y-auto">
        <Text strong className="flex items-center">
          <BellOutlined className="mr-2" /> 通知
        </Text>
        <div className="mt-2">
          {notifications.map((noti) => (
            <div
              key={noti.id}
              className={`p-2 mb-2 rounded transition-colors ${
                noti.read ? "bg-white" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between">
                <Text className={noti.read ? "text-gray-500" : "font-semibold"}>
                  {noti.content}
                </Text>
                {!noti.read && (
                  <span className="h-2 w-2 rounded-full bg-red-500 ml-2"></span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">1小时前</p>
            </div>
          ))}
        </div>
      </div>

      <Divider className="my-2" />

      {/* 操作菜单 */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="flex items-center justify-center"
          onClick={() => (window.location.href = "/settings")}
        >
          个人设置
        </Button>
        <Button
          type="text"
          icon={<MailOutlined />}
          className="flex items-center justify-center"
        >
          我的消息
        </Button>
        <Button
          type="text"
          icon={<UserOutlined />}
          className="flex items-center justify-center"
        >
          个人主页
        </Button>
        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          className="flex items-center justify-center"
          onClick={onLogout}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // 处理退出登录
  const handleLogout = () => {
    logout(); // 调用登出方法

    window.location.href = "/login";
  };

  // 用户信息弹窗内容
  const content = <UserProfileContent onLogout={handleLogout} />;

  const LoginComponent = () => {
    if (isLoggedIn()) {
      // 确保使用isLoggedIn函数进行调用
      return (
        <Popover
          content={content}
          title={null}
          trigger="hover"
          placement="bottom"
        >
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
            <Avatar
              size="default"
              icon={<UserOutlined />}
              className="bg-blue-500"
            />
            <span className="hidden lg:inline">王小明</span>
          </div>
        </Popover>
      );
    } else {
      return (
        <Link to="/login">
          <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-700 transition">
            登录 &#x1F600;
          </button>
        </Link>
      );
    }
  };

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white shadow-sm">
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 md:gap-4 text-lg md:text-2xl font-bold"
      >
        <HHImage
          src="/logo.png"
          alt="logo 图片"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="hidden md:inline">你好啊李银河</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* mobile button */}
        <div
          className="cursor-pointer text-2xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </div>

        {/* mobile link list */}
        <div
          className={`fixed w-full h-full flex flex-col items-center justify-center gap-8 font-medium text-lg bg-white z-50 top-0 left-0 transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            主页
          </Link>
          <Link to="/popular" onClick={() => setOpen(false)}>
            热门
          </Link>
          <Link to="/trending" onClick={() => setOpen(false)}>
            趋势
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            关于
          </Link>
          <LoginComponent />
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          主页
        </Link>
        <Link to="/popular" className="hover:text-blue-600 transition">
          热门
        </Link>
        <Link to="/trending" className="hover:text-blue-600 transition">
          趋势
        </Link>
        <Link to="/about" className="hover:text-blue-600 transition">
          关于
        </Link>
        <LoginComponent />
      </div>
    </div>
  );
};

export default Navbar;
