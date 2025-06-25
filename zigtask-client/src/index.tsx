import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeContextProvider } from "./theme/ColorModeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ColorModeContextProvider>
    <App />
  </ColorModeContextProvider>
);

reportWebVitals();
