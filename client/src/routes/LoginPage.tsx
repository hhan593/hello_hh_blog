import { FaUser, FaLock, FaAlipay, FaWeixin } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/reducer/userSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Login } from "../api/user";
import { setToken } from "../utils/auth";
import { message } from "antd";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("用户名和密码不能为空");
      return;
    }
    try {
      setLoading(true);
      const res: any = await Login({ username, password });
      
      if (res.code === 200 && res.token) {
        setToken(res.token);
        dispatch(setUserInfo(res.user));
        navigate("/home", { replace: true });
      } else {
        message.error(res.message || "登录失败");
      }
    } catch (err) {
      setError(err.message || "网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/login_bg.png')` }}
    >
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />

      {/* 登录卡片 */}
      <div className="absolute top-1/2 left-1/2 w-[350px] max-w-[90%]  -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">HH Blog</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="flex items-center border-b border-gray-300 py-2 mb-4">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="用户名"
              className="w-full bg-transparent outline-none"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 mb-4">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="密码"
              autoComplete="current-password"
              className="w-full bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-3 text-center">{error}</div>
          )}

          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded font-semibold transition duration-300`}
            disabled={loading}
          >
            {loading ? "登录中..." : "登 录"}
          </button>
        </form>
        <div className="flex mt-6 mb-3 items-center justify-center">
          <button>
            暂无账号？
            <Link to="/register" className=" hover:underline text-blue-800">
              去注册
            </Link>
          </button>
        </div>
        <div className="mt-3 text-center text-sm text-gray-500">
          其他登录方式
        </div>
        <div className="flex justify-center mt-2 space-x-6 text-xl text-gray-600">
          <FaAlipay className="text-blue-500 cursor-not-allowed" />
          <FaWeixin className="text-green-500 cursor-not-allowed" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
