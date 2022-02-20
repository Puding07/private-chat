//import liraries
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import io from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.scss";
import Paths from "../Routes/Routes";

// create a component named App
export const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`${window.location.hostname}:3000`); // :3000 only needed in development

    newSocket?.on("connect", () => setSocket(newSocket));

    newSocket.connect();

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Router>
      {socket ? (
        <Paths socket={socket} />
      ) : (
        <div className="waiting">
          <CircularProgress />
        </div>
      )}
    </Router>
  );
};
