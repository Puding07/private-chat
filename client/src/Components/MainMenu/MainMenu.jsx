//import liraries
import React from "react";
import { useNavigate } from "react-router-dom";

import "./MainMenu.scss";
import { EnterButton } from "../EnterButton/EnterButton";

// create a component named MainMenu
const MainMenu = () => {
  const navigate = useNavigate();

  const enterChat = () => {
    const randomRoom = [...Array(16)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

    navigate(`/room/${randomRoom}`);
  };

  return (
    <div className="main-menu">
      <h2>
        <EnterButton
          variant="contained"
          onTouchEnd={() => enterChat()}
          onClick={() => enterChat()}
        >
          Enter
        </EnterButton>
        {" private chat"}
      </h2>
    </div>
  );
};

//make this component available to the app
export default MainMenu;
