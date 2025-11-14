import React from "react";
import HHImage from "./HHImage";
import { Link } from "react-router-dom";
import { getCategoryName } from "../utils/util";
const PostListItem = ({ post }) => {
  const fullImgUrl = post.img
    ? `http://localhost:3000/${post.img}`
    : "/postImg.jpeg";

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block xl:w-1/3">
        <HHImage
          src={fullImgUrl}
          alt="封面"
          width={735}
          className="rounded-2xl object-cover"
        ></HHImage>
      </div>

      <div className="flex flex-col gap-2 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>作者</span>
          <Link to="/" className="text-blue-800">{post.user.createdBy}</Link>
          <span>栏目</span>
          <Link to="/posts" className="text-blue-800">
            {getCategoryName(post.category)}
          </Link>
          <span>{post.createdAt}</span>
        </div>
        <p>{post.desc}</p>
        <Link className="text-blue-800 underline text-sm" to={`/${post.slug}`}>
          更多
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
