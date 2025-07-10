import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}; 