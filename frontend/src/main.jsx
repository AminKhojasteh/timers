import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/authContext.jsx";
import { TimersContextProvider } from "./context/timersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <TimersContextProvider>
        <App />
      </TimersContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
