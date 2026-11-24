import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./styles.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ff681f" },
    secondary: { main: "#ffe52e" },
    background: { default: "#fff9f1", paper: "#fff9f1" },
    text: { primary: "#40231d", secondary: "#76564b" },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    button: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800 },
  },
  shape: { borderRadius: 14 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
