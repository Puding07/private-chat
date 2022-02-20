const { Server } = require("socket.io");
const { createServer } = require("http");

const http = createServer();
const io = new Server(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

let messages = [];
let clients = [];
let secretRoom = "";

io.on("connection", (socket) => {
  console.log("id: ", socket.id);

  socket.on("roomName", (room) => {
    console.log(room);
    if (secretRoom !== "" && socket.id === clients[0]) {
      messages = [];
      clients = [];
      secretRoom = "";

      console.log("Deleted room.");
    }

    if (clients.length === 0) {
      socket.join(room);
      if (messages.length) socket.emit("messages", messages);
      socket.emit("status", "Success");

      clients.push(socket.id);
      secretRoom = room;

      console.log("Created and joined room");
    } else if (clients.length === 1 && room === secretRoom) {
      socket.join(room);
      if (messages.length) socket.emit("messages", messages);
      socket.emit("status", "Success");

      clients.push(socket.id);
      secretRoom = room;

      console.log("Joined room");
    } else {
      socket.emit("status", "Error");
      socket.disconnect(true);

      console.log("Disconnected client.");
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

      console.log("Disconnected client.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);

    if (clients.includes(socket.id)) {
      clients = clients.filter((id) => {
        return id !== socket.id;
      });

      console.log("Deleted client.");

      if (clients.length === 0) {
        messages = [];
        secretRoom = "";

        console.log("Deleted room.");
      }
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
