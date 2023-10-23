import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import CustomToastContainer from "./components/toast/CustomToastContainer.jsx";

import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const scope = import.meta.env.VITE_AUTH0_SCOPE;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: scope,
      }}
    >
      <Provider store={store}>
        <SkeletonTheme baseColor="#ebebe8" highlightColor="#dadad8">
          <BrowserRouter>
            <App />
            <CustomToastContainer />
          </BrowserRouter>
        </SkeletonTheme>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
