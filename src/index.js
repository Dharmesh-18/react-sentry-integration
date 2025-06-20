import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";

// Sentry Initialize
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN, // Yaha apna Sentry DSN paste karo
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance monitoring ke liye
  tracesSampleRate: 1.0, // 100% transactions capture karo
  // Session replays ke liye
  replaysSessionSampleRate: 0.1, // 10% sessions record karo
  replaysOnErrorSampleRate: 1.0, // Error hone pe 100% replays
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={<h2>Something went wrong. Please try again later.</h2>}
    >
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
