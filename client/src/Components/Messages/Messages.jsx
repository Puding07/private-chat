//import liraries
import React, { useEffect, useState } from "react";

import "./Messages.scss";
import {
  listMessages,
  messageListener,
  roomStatusListener,
} from "../../Listeners/Listeners";

// create a component named Messages
const Messages = ({ socket, secret }) => {
  const [messages, setMessages] = useState([]);

  const scrollToNew = () => {
    const messagesDiv = document.querySelector(".messages");
    messagesDiv.scrollTo(0, messagesDiv.scrollHeight);
  };

  useEffect(() => {
    socket.on("message", (message) =>
      messageListener(message, secret, setMessages)
    );
    socket.on("messages", (message) => listMessages(message, setMessages));
    socket.on("status", (status) => roomStatusListener(status));

    return () => {
      socket.off("message", messageListener);
      socket.off("messages", messageListener);
      socket.off("status", roomStatusListener);
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
            title={`Sent at ${new Date(message.time).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}`}
          >
            <div
              className={
                message.id === socket.id ? "message-you" : "message-partner"
              }
            >
              <span className="message">{message.value}</span>
              <span className="date">
                {new Date(message.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

//make this component available to the app
export default Messages;
