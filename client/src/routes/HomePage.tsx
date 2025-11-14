import { Link, Navigate, useLocation } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { isLoggedIn } from "../utils/auth";
// const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
function HomePage() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="mt-4 flex-col gap-4">
      <div className="flex gap-2"></div>
      {/* 介绍 */}
      <div className="flex items-center justify-between">
        {/* 标题 */}
        <div className="rounded-2xl">
          <h1 className="text-gray-800 text-2xl md:text-5xl  lg:text-6xl font-bold">
            你好，欢迎来到我的博客
          </h1>
          <p className="mt-8 text-md md:text-xl ">
            在这里分享我的想法、经验和学习过程。探索各种主题，从技术到生活感悟。
          </p>
        </div>
        {/* 按钮 */}
        <Link to="/write" className="relative hidden md:block">
          {/* 动画按钮 */}
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton "
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100,100 m -75, 0 a 75, 75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            ></path>
            <text>
              <textPath href="#circlePath" startOffset="0%">
                write your story
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                share your idea
              </textPath>
            </text>
          </svg>
          <button className=" absolute top-0 left-0 right-0 h-20 w-20 bottom-0 m-auto bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={50}
              height={50}
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1={6} y1={18} x2={18} y2={6} />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* 分类 */}
      <MainCategories />
      {/* 排行前几的文章*/}
      <FeaturedPosts />
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">最近的博客</h1>
        <PostList category={undefined} />
      </div>
    </div>
  );
}

export default HomePage;
