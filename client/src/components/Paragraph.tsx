import type { ElementType } from "react";

interface ParagraphProps {
  content: string;
  wrapper?: ElementType;
  segmentElement?: ElementType;
}

const Paragraph = ({
  content,
  wrapper: Wrapper = "div",
  segmentElement: Segment = "p",
}: ParagraphProps) => {
  // 使用 DOMParser 解析 HTML 字符串
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  // 获取所有 <p> 元素并提取其纯文本内容
  const segments = Array.from(doc.querySelectorAll("p"))
    .map((p) => p.textContent.trim())
    .filter((text) => text); // 过滤掉空段落

  return (
    <Wrapper className="lg:text-lg flex-1 flex flex-col gap-6 text-justify">
      {segments.map((text, index) => (
        <Segment key={index} className={`segment-${index}`}>
          {text}
        </Segment>
      ))}
    </Wrapper>
  );
};

export default Paragraph;
