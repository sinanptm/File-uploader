import { Server } from "socket.io";
import FileProcessor from './fileProcessor.js';

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: "*",
        },
        transports: ["websocket"],
        pingTimeout: 60000,
    });

    new FileProcessor(io);

    io.on("connection", (socket) => {
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

export default initializeSocket;