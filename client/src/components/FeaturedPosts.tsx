import HHImage from "./HHImage";
import { Link } from "react-router-dom";
 
const FeaturedPosts = () => {
  return (
    <div className="flex flex-col mt-8 lg:flex-row gap-8">
      {/* 第一受欢迎 */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* 图片 */}
        <HHImage
          src="/featured1.jpeg"
          className="rounded-3xl object-cover"
          width="895"
        />
        {/* 内容 */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="/posts" className="text-blue-800 lg:text-lg">网页设计</Link>
          <span className="text-gray-500">两天前</span>
        </div>
        {/* 标题 */}
        <Link
          to="/test"
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          这是第一的标题
        </Link>
      </div>
      {/* 其他的 */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* 第二 */}
        <div className="flex justify-between gap-4 lg:h-1/3 ">
          {/* 图片 */}
          <div className="w-1/3 aspect-video">
            <HHImage
              width="298"
              src="/featured2.jpeg"
              className="rounded-3xl object-cover h-full w-full"
            ></HHImage>
          </div>

          <div className="w-2/3">
            {/* 详细信息 */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link to="/posts" className="text-blue-800">wen design</Link>
              <span className="text-gray-500 ">三天前</span>
            </div>
            {/* 内容 */}
            <Link
              to="/test"
              className="text-base sm:text:lg md:text-2xl lg:text:xl xl:text-2xl font-medium"
            >
              这是一段内容
            </Link>
          </div>
        </div>
        {/* 3 */}
        <div className="flex justify-between gap-4 lg:h-1/3 ">
          {/* 图片 */}
          <div className="w-1/3 aspect-video">
            <HHImage
              width="298"
              src="/featured3.jpeg"
              className="rounded-3xl object-cover h-full w-full"
            ></HHImage>
          </div>

          <div className="w-2/3">
            {/* 详细信息 */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link to="/posts" className="text-blue-800">wen design</Link>
              <span className="text-gray-500 ">三天前</span>
            </div>
            {/* 内容 */}
            <Link
              to="/test"
              className="text-base sm:text:lg md:text-2xl lg:text:xl xl:text-2xl font-medium"
            >
              这是一段内容
            </Link>
          </div>
        </div>
        {/* 4 */}
        <div className="flex justify-between gap-4 lg:h-1/3 ">
          {/* 图片 */}
          <div className="w-1/3 aspect-video">
            <HHImage
              width="298"
              src="/featured4.jpeg"
              className="rounded-3xl object-cover h-full w-full"
            ></HHImage>
          </div>

          <div className="w-2/3">
            {/* 详细信息 */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link to="/posts" className="text-blue-800">wen design</Link>
              <span className="text-gray-500 ">三天前</span>
            </div>
            {/* 内容 */}
            <Link
              to="/test"
              className="text-base sm:text:lg md:text-2xl lg:text:xl xl:text-2xl font-medium"
            >
              这是一段内容
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
