import { Decrypt } from "../Crypto/Crypto";

export const messageListener = (message, secret, setMessages) => {
  console.log(message);
  const decrypted = Decrypt(secret, message);
  console.log(decrypted);

  setMessages((prevMessages) => [...prevMessages, decrypted]);

  scrollToNew();
};

export const listMessages = (messages, setMessages) => {
  setMessages(messages);
  scrollToNew();
};

export const roomStatusListener = (status) => {
  // alert(status);
};

const scrollToNew = () => {
  const messagesDiv = document.querySelector(".messages");
  messagesDiv.scrollTo(0, messagesDiv.scrollHeight);
};
