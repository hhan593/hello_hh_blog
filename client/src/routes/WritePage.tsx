import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 修改这里
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { getToken, isLoggedIn } from "../utils/auth";
import { getUserInfo } from "../api/user";
import { createPost } from "../api/post";
import { message } from "antd";
import ImageUploader from "../components/ImageUploader";

const WritePage = () => {
  const navigate = useNavigate(); // 使用 useNavigate 代替 useHistory
  const [user, setUser] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false); // 提交状态
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    description: "",
    content: "",
    img: null,
  });
  const token = getToken();
  useEffect(() => {
    if (token) {
      getUserInfo().then((res) => {
        setUser(res);
      });
    }
  }, [token]);

  if (!isLoggedIn()) {
    return <div>请先登录才能写博客</div>;
  }

  // 处理文本/选择框输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 富文本内容
  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    if (!user || !user._id) {
      message.error("无法获取用户信息，请重新登录");
      setIsSubmitting(false);
      return;
    }
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("content", formData.content);
      if (formData.img) {
        

        data.append("img", formData.img);
      }
      data.append("user", user._id);
      data.append("createBy", user.username);
      const response: any = await createPost(data);
      
      if (response.slug) {
        message.success({
          content: "文章发布成功！",
          duration: 1.5,
        });
        setTimeout(() => {
          navigate(`/${response.slug}`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      message.error({
        content: err.response?.data?.message || "发布失败",
        duration: 1.5,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6 mt-4 md:h-[calc(100vh-80px)]">
      <h1 className="text-cl font-light">写一个新的博客</h1>
      <form className="flex flex-col gap-6 flex-1 mb-6" onSubmit={handleSubmit}>
        {/* 上传按钮 */}
        <ImageUploader
          value={formData.img}
          onChange={(file) => setFormData((prev) => ({ ...prev, img: file }))}
          isUploading={isSubmitting}
          error={error}
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="标题"
          required
        />

        <div className="flex items-center gap-4">
          <label className="text-sm">选择博客类型</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">通用</option>
            <option value="web_design">网页设计</option>
            <option value="development">开发</option>
            <option value="databases">数据库</option>
            <option value="seo">搜索引擎优化</option>
            <option value="marketing">营销</option>
          </select>
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="一个简短的介绍"
          className="p-4 rounded-xl bg-white shadow-md"
        ></textarea>

        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          className="flex-1 rounded-xl bg-white shadow-md"
        />

        {error && <div className="text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-800 text-white font-medium rounded-xl my-2 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "发布中..." : "发布"}
        </button>
      </form>
    </div>
  );
};

export default WritePage;
