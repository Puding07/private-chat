const { Server } = require("socket.io");
const { createServer } = require("http");

const http = createServer();
const io = new Server(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const messages = [];
let clients = 0;

io.on("connection", (socket) => {
  console.log("id: ", socket.id);

  socket.on("roomName", (room) => {
    if (clients < 2) {
      socket.join(room);
      if (messages.length) socket.emit("messages", messages);

      clients++;
    } else {
      socket.emit("status", "Error");
      socket.disconnect(true);
    }
  });

  socket.on("secret", (secret) => {
    if (socket.rooms.has(secret.room)) {
      io.to(secret.room).emit("message", secret.value);

      messages.push(secret.value);
    } else {
      socket.disconnect(true);
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
