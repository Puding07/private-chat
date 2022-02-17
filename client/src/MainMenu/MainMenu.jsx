//import liraries
import React from "react";

// create a component named MainMenu
const MainMenu = ({ socket }) => {
  const enterChat = () => {
    const randomRoom = [...Array(16)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

    socket.emit("roomName", randomRoom);
  };

  return (
    <div>
      <h1>Enter chat room for only 2 clients.</h1>
      <input value="Enter" onClick={() => {}} />
    </div>
  );
};

//make this component available to the app
export default MainMenu;
