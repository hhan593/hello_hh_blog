import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/user";
import { isEmail } from "../utils/util";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 表单字段变更处理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    //
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 同步验证（避免异步问题）
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      let error = "";

      switch (field) {
        case "username":
          if (!value.trim()) error = "用户名不能为空";

          break;
        case "email":
          if (!value.trim()) error = "邮箱不能为空";
          else if (!isEmail(value)) error = "邮箱格式不正确";
          break;
        case "password":
          if (!value.trim()) error = "密码不能为空";
          else if (value.length < 6) error = "密码至少6个字符";
          break;
      }
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // 同步阻止提交
    }

    try {
      setLoading(true);
      const res: any = await register(formData);

      if (res.code === 200) {
        navigate("/login");
      } else {
        setErrors({ server: res.message || "注册失败" });
      }
    } catch (error) {
      setErrors({ server: error.message || "网络错误" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/login_bg.png')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
      <div className="absolute top-1/2 left-1/2 w-[350px] max-w-[90%]  -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          注册
        </h2>

        {errors.server && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-gray-500" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="用户名"
              className={`w-full pl-10 pr-4 py-[8px] border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="邮箱地址"
              className={`w-full pl-10 pr-4 py-[8px] border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoComplete="email"
            />
            {errors.email && (
              <p className=" text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="密码"
              className={`w-full pl-10 pr-12 py-[8px] border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* 注册按钮 */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-[8px] px-4 rounded-lg font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } transition-colors duration-300`}
          >
            {loading ? "注册中..." : "注册账户"}
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            已有账户？{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              立即登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
