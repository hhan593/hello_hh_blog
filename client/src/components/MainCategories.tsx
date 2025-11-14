import { Link } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;
const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full px-4 py-2 shadow-lg items-center justify-center gap-8">
      {/* 链接 */}
      <div className=" flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          全部
        </Link>
        <Link
          to="/posts?category=web_design"
          className="hover:bg-blue-50    rounded-full px-4 py-2"
        >
          网页设计
        </Link>{" "}
        <Link
          to="/posts?category=development"
          className="hover:bg-blue-50  rounded-full px-4 py-2"
        >
          开发
        </Link>{" "}
        <Link
          to="/posts?category=databases"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          数据库
        </Link>{" "}
        <Link
          to="/posts?category=seo"
          className="hover:bg-blue-50  rounded-full px-4 py-2"
        >
          搜索引擎优化
        </Link>
        <Link
          to="/posts?category=markting"
          className="hover:bg-blue-50  rounded-full px-4 py-2"
        >
          营销
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* 搜索按钮 */}
      <div className=" p-2 rounded-full flex items-center gap-2">
        <Search
          allowClear
          className="w-full"
          placeholder="输入你要搜索的内容"
          
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
};
export default MainCategories;
