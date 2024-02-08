import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster  richColors toastOptions={{classNames:{title:'!font-semibold'}}}/>
    <App />
  </React.StrictMode>
);
