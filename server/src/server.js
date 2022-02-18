const { Server } = require("socket.io");
const { createServer } = require("http");

const http = createServer();
const io = new Server(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

let messages = [];
let clients = [];

io.on("connection", (socket) => {
  console.log("id: ", socket.id);

  socket.on("roomName", (room) => {
    console.log(room);
    if (clients.length < 2) {
      socket.join(room);
      if (messages.length) socket.emit("messages", messages);
      socket.emit("status", "Success");

      clients.push(socket.id);
    } else {
      socket.emit("status", "Error");
      socket.disconnect(true);
    }
  });

  socket.on("secret", (secret) => {
    console.log(secret);
    if (socket.rooms.has(secret.room)) {
      io.to(secret.room).emit("message", {
        value: secret.value,
        integrity: secret.integrity,
      });

      messages.push({
        value: secret.value,
        integrity: secret.integrity,
      });
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);

    if (clients.includes(socket.id)) {
      clients = clients.filter((id) => {
        return id !== socket.id;
      });
      if (clients.length === 0) {
        messages = [];
      }
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
