import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HHImage from "../components/HHImage";
import { getCategoryName } from "../utils/util";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/Comments";
import Paragraph from "../components/Paragraph";
import { getPostBySlug } from "../api/post";
import { postTime } from "../utils/util";
const SignlePostPage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getPostBySlug(slug)
      .then((res) => {
        
        if (!res) throw new Error("API 返回异常");
        setPost(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: </div>;
  if (!post) return <div className="text-center py-12">暂无文章</div>;
  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl 2xl:text-5xl font-semibold">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>作者</span>
            <Link to="/" className="text-blue-800">{post.user.createdBy}</Link>
            <span>栏目</span>
            <Link to="/posts" className="text-blue-800">
              {getCategoryName(post.category)}
            </Link>
            <span>发布时间</span>
            <span>{postTime(post.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{post.desc}</p>
        </div>
        <div className="hidden lg:block w-2/5">
          <HHImage
            src="/postImg.jpeg"
            width="600"
            className="rounded-2xl"
          ></HHImage>
        </div>
      </div>
      {/* 内容 */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* 文章 */}
        <Paragraph content={post.content}></Paragraph>

        {/* 主页 */}
        <div className="px-2 h-max sticky top-0">
          <h1 className=" mb-4 text-sm font-medium">作者</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <HHImage
                src="userImg.jpeg"
                className="w-12 h-12 rounded-full object-cover"
                width="48"
                height="48"
              />
              <Link to="/" className="text-blue-800">{post.user.createdBy}</Link>
            </div>

            {/* 个人简介 */}
            <p className="text-gray-500 text-sm">{post.user.desc}</p>
            <div className="flex gap-2 ">
              <Link to="/">
                <HHImage src="facebook.svg" />
              </Link>
              <Link to="/">
                <HHImage src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuAction />
          <h1 className="mt-8 mb-4 text-sm font-medium">类别</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="  underline">
              网页设计
            </Link>
            <Link to="/" className="underline">
              前端开发
            </Link>
            <Link to="/" className="underline">
              后端开发
            </Link>

            <Link to="/" className="underline">
              数据科学
            </Link>
            <Link to="/" className="underline">
              人工智能
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">搜索</h1>
          <Search />
        </div>
      </div>
      <Comments post={post} />
    </div>
  );
};

export default SignlePostPage;
