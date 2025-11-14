import { useState } from "react";
import MessageList from "../components/MessageList";
import MessageContent from "../components/MessageContent";
import { BellOutlined } from "@ant-design/icons";
const arr = [
  {
    id: 1,
    title: "标题1",
    content: "内容",
    time: "2023-05-05",
  },
  {
    id: 2,
    title: "标题2",
    content: "内容",
    time: "2023-05-05",
  },
  {
    id: 3,
    title: "标题3",
    content: "内容",
    time: "2023-05-05",
  },
  {
    id: 4,
    title: "标题4",
    content: "内容",
    time: "2023-05-05",
  },
  {
    id: 5,
    title: "标题5",
    content: "内容",
    time: "2023-05-05",
  },
];
const Message = () => {
  const [selectId, setSelectId] = useState(1);
  const [message, setMessage] = useState("");
  return (
    <div className="mt-2 pb-2 bg-white box-border h-[calc(100vh_-_1rem)] flex ">
      <div className="flex flex-col w-1/6 ">
        <div className="text-lg font-normal box-border mr-2 ml-8 pb-2 pt-8  ">
          <BellOutlined />
          消息中心
        </div>
        <ul className="flex-1 overflow-auto p-2 ml-10 mr-2 space-y-2">
          {arr.map((item) => (
            <li
              className={`cursor-pointer mt-4 py-4 ${
                selectId === item.id ? "text-blue-500" : "hover:text-blue-500"
              }`}
              key={item.id}
              onClick={() => setSelectId(item.id)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="m-4 w-5/6 h-full flex flex-col">
        <div className="bg-gray-100 w-full text-lg rounded-md flex justify-between pl-4 h-12 items-center pr-10 shadow-md">
          <div>我的消息</div>
          <div className="">{3333}</div>
        </div>

        <div className="w-full flex flex-1 mt-4 box-border border border-gray-200 rounded-md shadow-xl overflow-hidden">
          <div className="w-1/4 flex flex-col h-full">
            <div className="h-9 border-b-2  border-r-2  flex items-center justify-start pl-4 border-gray-200">
              我的消息
            </div>
            <div className=" border-r-2 flex-1 min-h-0 border-gray-200 overflow-hidden">
              <MessageList setMessage={setMessage} />
            </div>
          </div>
          <div className="w-3/4 h-full ">
            <MessageContent message={message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
