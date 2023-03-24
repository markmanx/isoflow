import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "@mui/material/GlobalStyles";
import { mockScene } from "./mockData";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyles
      styles={{
        body: {
          margin: 0,
        },
      }}
    />
    <App initialScene={mockScene} height="100vh" />
  </React.StrictMode>
);
