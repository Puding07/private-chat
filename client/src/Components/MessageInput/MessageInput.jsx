//import liraries
import React, { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import "./MessageInput.scss";
import MessageField from "../MessageField/MessageField";
import { SendButton } from "../EnterButton/EnterButton";
import { Encrypt } from "../../Crypto/Crypto";

// create a component named MessageInput
const MessageInput = ({ socket, secret }) => {
  const [value, setValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    if (value !== "") {
      const encrypted = Encrypt(secret, socket.id, value);

      socket.emit("secret", encrypted);
      setValue("");
    }

    return false;
  };

  return (
    <form onSubmit={submitForm} className="input">
      <MessageField
        id="standard-basic"
        label="Message"
        autoComplete="off"
        value={value}
        autoFocus
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <SendButton
        variant="contained"
        onTouchEnd={submitForm}
        onClick={submitForm}
      >
        <SendRoundedIcon />
      </SendButton>
    </form>
  );
};

//make this component available to the app
export default MessageInput;
