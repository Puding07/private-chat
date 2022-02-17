//import liraries
import React, { useState } from "react";

// create a component named MessageInput
const MessageInput = ({ socket }) => {
  const [value, setValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("secret", {
      room: "secretRoom",
      value: { id: socket.id, time: new Date(), value },
    });
    setValue("");

    return false;
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>
    </div>
  );
};

//make this component available to the app
export default MessageInput;
