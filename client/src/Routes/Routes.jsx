//import liraries
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainMenu from "../Components/MainMenu/MainMenu";
import Room from "../Components/Room/Room";

// create a component named Routes
const Paths = ({ socket }) => {
  useEffect(() => {
    console.log(window.location.href);
  });

  return (
    <Routes>
      <Route path="/" element={<MainMenu socket={socket} />} />
      <Route path="/room/:id" element={<Room socket={socket} />} />
    </Routes>
  );
};

//make this component available to the app
export default Paths;
