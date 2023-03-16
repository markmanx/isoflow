import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { mockScene } from "./mockData";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App initialScene={mockScene} />
  </React.StrictMode>
);
