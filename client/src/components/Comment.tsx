import React, { useEffect, useState } from "react";
import HHImage from "./HHImage";
import MyIcon from "./Icons/MyIcon";
import socket from "../hooks/useSocket.js"; // 👈 引入抽离的 socket 实例

const Comment = ({ content }) => {
  const [likeCount, setLikeCount] = useState(content.likeCount || 0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const Like = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    // console.log("------------------>", content._id);
    // socket.emit("like", { commentId: content._id });
  };

  const Dislike = () => {
    setIsDisliked(!isDisliked);
  };

  useEffect(() => {
    const handleLikeUpdate = ({ commentId }) => {
      if (commentId === content._id) {
        setLikeCount((prev) => prev + 1);
      }
    };

    socket.on("likeUpdate", handleLikeUpdate);

    return () => {
      socket.off("likeUpdate", handleLikeUpdate);
    };
  }, [content._id]);

  return (
    <div className="bg-slate-50 rounded-xl mb-8 p-4">
      <div className="flex items-center gap-4">
        <HHImage
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          width="40"
        />
        <span className="font-medium">
          {content.user?.nickname || content.user?.username}
        </span>
        <span className="text-sm text-gray-500">两小时前</span>
      </div>
      <div className="mt-4">
        <p>{content.desc || "这是一条评论内容。"}</p>
      </div>
      <div className="flex items-center gap-2 justify-end mt-4">
        <div className="flex items-center gap-2 mx-4" onClick={Like}>
          <MyIcon
            type={isLiked ? "icon-Like-active" : "icon-Like-normal"}
            color="#1877F2"
          />
          <span className="text-sm">{likeCount}</span>
        </div>
        <div className="flex items-center gap-2" onClick={Dislike}>
          <MyIcon
            type={isDisliked ? "icon-Dislike-active" : "icon-Dislike-normal"}
            color="#FF0000"
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
