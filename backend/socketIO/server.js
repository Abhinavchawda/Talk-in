import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const users = {};       //array of online users

//function for real-time messaging
export const getReceiverSocketId = (receeiverId) => {
    return users[receeiverId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
    };

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });

    // Error handling
    socket.on("error", (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

export { app, io, server };