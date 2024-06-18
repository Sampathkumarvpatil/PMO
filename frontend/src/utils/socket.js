import { io } from "socket.io-client";
const URL = "http://localhot:8000";
export const socket = io(URL);
