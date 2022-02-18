//import liraries
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// create a component named MainMenu
const MainMenu = ({ socket }) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    socket.on("status", statusListener);
    room && socket.emit("roomName", room);

    return () => {
      socket?.off("status", statusListener);
    };
  }, [socket, room]);

  const statusListener = (status) => {
    console.log(status);
    if (status === "Success") {
      navigate(`/room/${room}`);
    } else {
      alert("Sorry all rooms are full!");
    }
  };

  const enterChat = () => {
    const randomRoom = [...Array(16)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

    setRoom(randomRoom);
  };

  return (
    <div>
      <h1>Create chat room.</h1>
      <Button variant="contained" onClick={() => enterChat()}>
        Enter
      </Button>
    </div>
  );
};

//make this component available to the app
export default MainMenu;
