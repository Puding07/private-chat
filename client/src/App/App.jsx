//import liraries
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import io from "socket.io-client";

import "./App.scss";
import Paths from "../Routes/Routes";

// create a component named App
export const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    console.log(newSocket);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return <Router>{socket && <Paths socket={socket} />}</Router>;
};
