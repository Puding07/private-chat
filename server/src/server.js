const { Server } = require("socket.io");
const { createServer } = require("http");

const http = createServer();
const io = new Server(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const messages = [];
let clients = 0;
let secretRoom = "";

io.on("connection", (socket) => {
  console.log("id: ", socket.id);

  socket.on("roomName", (room) => {
    console.log(room);
    if (clients < 2) {
      socket.join(room);
      if (messages.length) socket.emit("messages", messages);
      socket.emit("status", "Success");
      secretRoom = room;

      clients++;
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

  /**
   * Disconnection not detecting properly...
   */

  socket.on("disconnect", () => {
    if (socket.rooms.has(secretRoom)) {
      if (clients === 1) {
        clients--;
        secretRoom === "";
        messages = [];
      } else if (clients > 0) {
        clients--;
      }
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
