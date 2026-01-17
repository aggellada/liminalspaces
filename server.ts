import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 1. Create the HTTP Server
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    // Let Next.js handle all standard HTTP requests (pages, API routes)
    handle(req, res, parsedUrl);
  });

  // 2. Attach Socket.io to the HTTP Server
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // --- YOUR CHAT LOGIC GOES HERE ---
    socket.on("join_uplink", (uplinkId) => {
      socket.join(uplinkId);
      console.log(`Socket ${socket.id} joined ${uplinkId}`);
    });

    socket.on("send_message", (data) => {
      // Broadcast to specific room (uplink)
      socket.to(data.uplinkId).emit("receive_message", data);
    });
    // ---------------------------------
  });

  // 3. Start Listening
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});