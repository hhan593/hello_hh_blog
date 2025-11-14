import { io, Socket } from "socket.io-client";
import { getToken } from "../utils/auth";

const token = getToken() ?? "";

const socket: Socket = io("http://localhost:3000", {
  query: { token },
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("✅ 已连接到 Socket.IO 服务");
});

export default socket;
