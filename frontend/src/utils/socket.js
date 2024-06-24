import { io } from "socket.io-client";

const URL = `${process.env.REACT_APP_BACKEND_BASE_URL}:${process.env.REACT_APP_RETROSPECTIVE_BACKEND_PORT}}`;

export const socket = io(URL);
