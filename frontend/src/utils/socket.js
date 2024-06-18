import { io } from "socket.io-client";
const URL = process.env.HOST_BASE_URL + process.env.RETROSPECTIVE_HOST_PORT;
export const socket = io(URL);
