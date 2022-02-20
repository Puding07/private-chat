//import liraries
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

// create a component named MessageField
const MessageField = styled(TextField)(({ theme }) => ({
  height: "100%",
  width: "80vw",
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    color: "#ffffff75",
  },
  "& label.Mui-focused": {
    color: "#873B6D",
  },
  "& .MuiOutlinedInput-root": {
    height: "100%",
    "& fieldset": {
      borderColor: "#873B6D",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#873B6D",
    },
  },
}));

//make this component available to the app
export default MessageField;
