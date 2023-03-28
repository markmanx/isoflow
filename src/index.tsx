import React, { useCallback } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "@mui/material/GlobalStyles";
import { mockScene } from "./mockData";
import { OnSceneChange } from "./renderer/types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const DataLayer = () => {
  const onSceneChange = useCallback<OnSceneChange>((event, scene) => {}, []);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <App
        initialScene={mockScene}
        onSceneChange={onSceneChange}
        height="100vh"
      />
    </>
  );
};

root.render(
  <React.StrictMode>
    <DataLayer />
  </React.StrictMode>
);
