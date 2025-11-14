import { Link } from "react-router-dom";
import { Popover, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserProfilePopover from "./UserProfilePopover";
import { isLoggedIn, logout } from "../utils/auth";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../store/reducer/userSlice";
import { persistor } from "../store";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate
import { removeToken } from "../utils/auth";

const LoginComponent = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 使用 useNavigate 代替 useHistory
  // 处理退出登录
  const handleLogout = () => {
    dispatch(clearUserInfo());

    removeToken();
    persistor.purge();
    navigate("/login");
  };

  if (isLoggedIn()) {
    return (
      <Popover
        content={<UserProfilePopover onLogout={handleLogout} user={user} />}
        title={null}
        trigger="hover"
        placement="bottom"
      >
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition">
          <Avatar
            size="default"
            icon={<UserOutlined />}
            className="bg-blue-500"
          />
          <span className="hidden lg:inline">{user?.username || "用户"}</span>
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

export default LoginComponent;
