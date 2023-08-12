import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { App as AntApp } from "antd";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AntApp>
      <Router>
        <App />
      </Router>
    </AntApp>
  </React.StrictMode>
);
