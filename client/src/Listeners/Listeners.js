import { Encrypt, Decrypt } from "../Crypto/Crypto";

export const messageListener = (message, secret, setMessages) => {
  const decrypted = Decrypt(secret, message);

  setMessages((prevMessages) => [...prevMessages, decrypted]);

  scrollToNew();
};

export const listMessages = (messages, secret, setMessages) => {
  const encrypted = messages.map((message) => Decrypt(secret, message));

  setMessages(encrypted);

  scrollToNew();
};

export const changeListener = (value, secret, id, setValue, setEncrypt) => {
  if (value !== "") {
    const encrypted = Encrypt(secret, id, value);
    setValue(value);
    setEncrypt(encrypted);
  }
};

export const shareLink = (setAlert) => {
  const link = document.URL;

  if ("clipboard" in navigator) {
    navigator.clipboard.writeText(link).then(
      function () {
        setAlert((state) => {
          state.open = true;
          state.message = "Copying to clipboard was successful!";
          state.type = "success";
          return { ...state };
        });
      },
      function (err) {
        setAlert((state) => {
          state.open = true;
          state.message = "Could not copy text!";
          state.type = "error";
          return { ...state };
        });
      }
    );
  } else {
    setAlert((state) => {
      state.open = true;
      state.message = `Please cop this link: ${link}`;
      state.type = "warning";
      return { ...state };
    });
  }
};

export const handleClose = (reason, setAlert) => {
  if (reason === "clickaway") {
    return;
  }

  setAlert((state) => {
    state.open = false;
    return { ...state };
  });
};

export const statusListener = (status, setAlert, navigate) => {
  if (status === "Success") {
    setAlert((state) => {
      state.open = true;
      state.message = "Connected";
      state.type = "success";
      return { ...state };
    });
  } else {
    setAlert((state) => {
      state.open = true;
      state.message = "Sorry all rooms are full!";
      state.type = "error";
      return { ...state };
    });
    navigate("/");
  }
};
const scrollToNew = () => {
  const messagesDiv = document.querySelector(".messages");
  messagesDiv.scrollTo(0, messagesDiv.scrollHeight);
};
