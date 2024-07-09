import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/user.context.jsx";
import OrientationChecker from "./providers/OrientationChecker.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrientationChecker>
          <App />
        </OrientationChecker>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
