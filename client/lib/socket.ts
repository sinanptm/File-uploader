// client/socket/index.ts
import { io, Socket } from "socket.io-client";
import { baseUrl } from "./api";

let existingSocket: Socket | null = null;

const connectSocketIO = (): Socket => {
    if (existingSocket?.connected) {
        return existingSocket;
    };

    const socket = io(baseUrl, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });

    existingSocket = socket;
    return socket;
};

export default connectSocketIO;