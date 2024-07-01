import { io } from "socket.io-client";

const URL = `${process.env.REACT_APP_BACKEND_BASE_URL}:${
  process.env.REACT_APP_SOCKET_PORT ?? 5000
}`;

export const socket = io(URL);
