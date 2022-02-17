//import liraries
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";

// create a component named App
export const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div>
      <h1>Hello there</h1>
      {socket?.connected ? (
        <div className="chat-container">
          <h2>Connected</h2>

          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
};
