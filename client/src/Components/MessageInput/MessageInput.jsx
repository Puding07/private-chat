//import liraries
import React, { useState } from "react";
import { TextField } from "@mui/material";
import CryptoJS, { AES, HmacSHA1, PBKDF2 } from "crypto-js";
import NoPadding from "crypto-js/pad-nopadding";
import CFB from "crypto-js/mode-cfb";

// create a component named MessageInput
const MessageInput = ({ socket, secret }) => {
  const [value, setValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const iv = CryptoJS.lib.WordArray.random(16);

    const key = PBKDF2(secret, salt, {
      keySize: 256 / 32,
    });

    const message = JSON.stringify({ id: socket.id, time: new Date(), value });
    console.log("Message: ", message);

    const encrypted = AES.encrypt(message, key, {
      iv: iv,
      mode: CFB,
      padding: NoPadding,
    });

    console.log("Encrypted: ", encrypted);

    const integrity = HmacSHA1(encrypted.toString(), key);

    console.log("Intergrity: ", integrity);

    /**
     * Convert IV and Salt to String to words Array
     */

    socket.emit("secret", {
      room: secret,
      value: { cipher: encrypted.toString(), iv: iv, salt: salt },
      integrity: integrity.toString(),
    });
    setValue("");

    return false;
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <TextField
          id="standard-basic"
          label="Message"
          value={value}
          autoFocus
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          variant="standard"
        />
      </form>
    </div>
  );
};

//make this component available to the app
export default MessageInput;
