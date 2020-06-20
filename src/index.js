import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);
