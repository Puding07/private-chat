//import liraries
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import "./Room.scss";
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";

// create a component named Room
const Room = ({ socket }) => {
  const params = useParams();

  useEffect(() => {
    const secretRoom = params.id;

    if (!socket?.rooms?.has(secretRoom)) {
      <Navigate to="/" />;
    }
  });
  return (
    <div className="room">
      <Messages socket={socket} secret={params.id} />
      <MessageInput socket={socket} secret={params.id} />
    </div>
  );
};

//make this component available to the app
export default Room;
