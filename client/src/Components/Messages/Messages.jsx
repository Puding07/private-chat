//import liraries
import React, { useEffect, useState } from "react";
import { AES, enc, HmacSHA1, PBKDF2 } from "crypto-js";
import CFB from "crypto-js/mode-cfb";
import NoPadding from "crypto-js/pad-nopadding";

import "./Messages.scss";

// create a component named Messages
const Messages = ({ socket, secret }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageListener = (message) => {
      console.log(message);

      /**
       * Convert IV and Salt from words Array to String
       */

      var key = PBKDF2(secret, message.value.salt, {
        keySize: 256 / 32,
      });

      const integrityCheck = HmacSHA1(message.value.cipher, key);

      console.log("Integrity check: ", integrityCheck.toString());

      if (message.integrity === integrityCheck.toString()) {
        var decrypted = AES.decrypt(message.value.cipher, key, {
          iv: message.value.iv,
          mode: CFB,
          padding: NoPadding,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(decrypted.toString(enc.Utf8)),
        ]);
      }
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
      socket.off("status", statusListener);
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
            <span className="user">{message.id}:</span>
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
