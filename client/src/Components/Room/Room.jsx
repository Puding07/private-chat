//import liraries
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import "./Room.scss";
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";
import { StatusAlert } from "../StatusAlert/StatusAlert";
import {
  handleClose,
  shareLink,
  statusListener,
} from "../../Listeners/Listeners";

// create a component named Room
const Room = ({ socket }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "center",
  });

  useEffect(() => {
    if (socket.connected) {
      socket?.on("status", (status) =>
        statusListener(status, setAlert, navigate)
      );

      const secretRoom = params.id;

      socket?.emit("roomName", secretRoom);
    } else {
      navigate("/");
    }

    return () => {
      socket?.off("connect", connectListener);
      socket?.off("status", statusListener);
    };
  }, [socket]);

  return (
    <div className="room">
      <header>
        <h1>{"Private Chat"}</h1>
        <button className="share" onClick={() => shareLink(setAlert)}>
          <ShareRoundedIcon />
        </button>
      </header>
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={(event, reason) => handleClose(reason, setAlert)}
        anchorOrigin={{
          vertical: alert.vertical,
          horizontal: alert.horizontal,
        }}
      >
        <StatusAlert
          onClose={(event, reason) => handleClose(reason, setAlert)}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </StatusAlert>
      </Snackbar>
      <Messages socket={socket} secret={params.id} />
      <MessageInput socket={socket} secret={params.id} />
    </div>
  );
};

//make this component available to the app
export default Room;
