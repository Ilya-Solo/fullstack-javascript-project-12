import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";
import store from "./slices/store";
import i18n from "./locales/initializei18";
import { I18nextProvider } from "react-i18next";

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <ReduxProvider store={store}>
            <App />
          </ReduxProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
