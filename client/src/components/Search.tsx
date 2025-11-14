const Search = () => {
  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray" // 修复颜色拼写
        strokeWidth="2" // 添加线宽
      >
        {/* 标准搜索图标路径 */}
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M17 17l4 4" />
      </svg>
      <input
        type="text"
        placeholder="请输入要搜索的内容..."
        className="bg-transparent outline-none flex-1"
      ></input>
    </div>
  );
};

export default Search;
