import { message } from "antd";

const MessageContent = ({ message }) => {
  
  return (
    <div>
      {
        <ul>
          <li>{message.address}</li>
          <li>{message.gender}</li>
          <li>{message.email}</li>
          <li>{message.phone}</li>
          <li>{message.city}</li>
          <li>{message.avatar}</li>
          <li>{message.name}</li>
        </ul>
      }
    </div>
  );
};

export default MessageContent;
