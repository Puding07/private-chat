//import liraries
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// create a component named EnterButton
export const EnterButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#14B266",
  borderRadius: "8px",
  width: "15vh",
  "&:hover": {
    backgroundColor: "#108b50",
  },
}));

export const SendButton = styled(Button)(({ theme }) => ({
  height: "100%",
  width: "10vw",
  color: "#fff",
  borderColor: "#FFCE00",
  backgroundColor: "#FFCE00",
  "&:hover": {
    borderColor: "#cca403",
    backgroundColor: "#cca403",
  },
}));
