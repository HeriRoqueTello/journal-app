import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
  palette: {
    primary: {
      main: '#0011A2'
    },
    secondary: {
      main: '#363EAD'
    },
    error: {
      main: red.A400
    }
  }
})