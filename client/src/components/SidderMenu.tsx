import { Link } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;

const SidderMenu = () => {
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">搜索</h1>
      <div className=" rounded-full flex items-center gap-2">
        <Search
          allowClear
          className="w-full"
          placeholder="输入你要搜索的内容"
          style={{ width: 200 }}
        />
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">筛选</h1>
      
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="sort-newest"
            name="sort"
            value="newset"
            className="relative h-4 w-4 appearance-none rounded-sm border-2 bg-white border-gray-300 checked:bg-blue-800 "
          />
          <label
            htmlFor="sort-newest"
            className="ml-2 cursor-pointer text-gray-700"
          >
            最新排序
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="sort-popular"
            name="sort"
            value="popular"
            className="relative h-4 w-4 appearance-none rounded-sm border-2 bg-white border-gray-300 checked:bg-blue-800 "
          />
          <label
            htmlFor="sort-popular"
            className="ml-2 cursor-pointer text-gray-700"
          >
            按热度排序
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="sort-comments"
            name="sort"
            value="comments"
            className="relative h-4 w-4 appearance-none rounded-sm border-2 bg-white   border-gray-300 checked:bg-blue-800"
          />
          <label
            htmlFor="sort-comments"
            className="ml-2 cursor-pointer text-gray-700"
          >
            最多评论
          </label>
        </div>
      </div>
      <h1 className=" mt-8 mb-4 text-sm font-medium">分类</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/posts" className="underline">
          全部
        </Link>
        <Link to="/posts?cat=web_design" className="underline">
          网页设计
        </Link>
        <Link to="/posts?cat=development" className="underline">
          开发
        </Link>
        <Link to="/posts?cat=database" className="underline">
          数据库
        </Link>
        <Link to="/posts?cat=seo" className="underline">
          搜索引擎优化
        </Link>
        <Link to="/posts?cat=markting" className="underline">
          营销
        </Link>
      </div>
    </div>
  );
};

export default SidderMenu;
