import { Avatar, Badge, Button, Divider, Typography } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const UserProfilePopover = ({ onLogout, user }) => {
  const { username = "未登录用户", email = "" } = user || {};
  const navigate = useNavigate();
  // 假设有消息通知数据
  const notifications = [
    { id: 1, type: "comment", content: "小明评论了你的文章", read: false },
    { id: 2, type: "like", content: "小红点赞了你的帖子", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ width: 300 }}>
      <div className="flex items-center p-4">
        <Badge count={unreadCount} offset={[-10, 10]}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={
              user.avatar ? `http://localhost:3000/${user?.avatar}` : undefined
            }
            className="bg-blue-500"
          />
        </Badge>
        <div className="ml-4">
          <Text strong className="text-lg">
            {username}
          </Text>
          {email && <p className="text-gray-500">{email}</p>}
          <p className="mt-1">
            {isLoggedIn() && <Badge status="success" text="在线" />}
            {!isLoggedIn() && <Badge status="error" text="离线" />}
          </p>
        </div>
      </div>

      <Divider className="my-2" />

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

      
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="flex items-center justify-center"
          onClick={() => navigate("/settings")}
        >
          个人设置
        </Button>
        <Button
          type="text"
          icon={<MailOutlined />}
          className="flex items-center justify-center"
          onClick={() => navigate("/messages")}
        >
          我的消息
        </Button>
        <Button
          type="text"
          icon={<UserOutlined />}
          className="flex items-center justify-center"
          onClick={() => navigate(`/user/${user?.id || ""}`)}
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

export default UserProfilePopover;
