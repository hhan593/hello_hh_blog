const PostMenuAction = () => {
  return (
    <div className="">
      <h1 className="mb-4 mt-8 text-sm font-medium">Actions</h1>
      <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 48 48"
        >
          <path
            d="M12 4C10.3 1 9 5.3 9 7V34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
            stroke="black"
            strokeWidth="2"
          ></path>
        </svg>
        <span>保存</span>
      </div>
      <h1>Actions</h1>
      <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <img src="/delete.svg" alt="" className="w-5 h-5 mr-1" />
        <span>删除</span>
      </div>
    </div>
  );
};

export default PostMenuAction;
