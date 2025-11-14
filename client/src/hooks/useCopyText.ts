import { useState } from "react";

/**
 * 自定义 Hook，用于将指定文本复制到剪贴板
 * @returns {Array} 返回一个数组，包含两个元素：第一个是复制函数，第二个是复制状态和提示信息对象
 */
export function useCopyText() {
  const [copyStatus, setCopyStatus] = useState<{ success: boolean; message: string }>({ success: false, message: "" });

  const copyText = (text: string) => {
    try {
      if (navigator.clipboard) {
        // 使用 Clipboard API 进行复制
        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopyStatus({ success: true, message: "复制成功" });
          })
          .catch((error) => {
            console.error("复制失败:", error);
            setCopyStatus({ success: false, message: "复制失败" });
          });
      } else {
        // 兼容旧浏览器，使用传统方式
        const tag = document.createElement("textarea");
        tag.value = text;
        document.body.appendChild(tag);
        tag.select();
        document.execCommand("copy");
        document.body.removeChild(tag);
        setCopyStatus({ success: true, message: "复制成功" });
      }
    } catch (error) {
      console.error("复制失败:", error);
      setCopyStatus({ success: false, message: "复制失败" });
    }
  };

  return [copyText, copyStatus] as const;
}
