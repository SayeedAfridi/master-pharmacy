import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "@src/AppProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>
);
