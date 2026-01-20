// import { createServer } from "http";
// import { parse } from "url";
// import next from "next";
// import { Server } from "socket.io";
// import prisma from "./lib/prisma";

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3000;

// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer((req, res) => {
//     const parsedUrl = parse(req.url!, true);

//     handle(req, res, parsedUrl);
//   });

//   const io = new Server(httpServer);

//   io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

//     // --- CHAT LOGIC GOES HERE ---
//     socket.on("join_uplink", (uplinkId) => {
//       socket.join(uplinkId);
//       console.log(`Socket ${socket.id} joined ${uplinkId}`);
//     });

//     // socket.on("send_message", async (data) => {
//     //   const message = await prisma.message.create({
//     //     data: {
//     //       uplinkId: data.uplinkId,
//     //       content: data.content,
//     //       senderId: data.senderId,
//     //     },
//     //   });

//     //   io.to(data.uplinkId).emit("receive_message", message);
//     // });
//   });

//   httpServer.listen(port, () => {
//     console.log(`> Ready on http://${hostname}:${port}`);
//   });
// });

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
// ❌ Remove prisma import entirely from here
// import prisma from "./lib/prisma"; 

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // 1. Join Room
    socket.on("join_uplink", (uplinkId) => {
      socket.join(uplinkId);
      console.log(`Socket ${socket.id} joined ${uplinkId}`);
    });

    // 2. Relay Message (Uncommented & Simplified)
    socket.on("send_message", (data) => {
      // Broadcast to everyone in the room EXCEPT the sender
      // We use socket.to() instead of io.to()
      // This prevents the sender from receiving their own message twice
      socket.to(data.uplinkId).emit("receive_message", data);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
