//import liraries
import React, { useEffect, useState } from "react";

import "./Messages.scss";

// create a component named Messages
const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("roomName", "secretRoom");

    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const listMessages = (messages) => {
      console.log(messages);
      setMessages(messages);
    };

    const statusListener = (status) => {
      alert(status);
    };

    socket.on("message", messageListener);
    socket.on("messages", listMessages);
    socket.on("status", statusListener);

    return () => {
      socket.off("message", messageListener);
      socket.off("messages", messageListener);
    };
  }, [socket]);

  return (
    <div className="messages">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={Math.random(Number(message.id))}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user">{message.name}:</span>
            <span className="message">{message.value}</span>
            <span className="date">
              {new Date(message.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
};

//make this component available to the app
export default Messages;
