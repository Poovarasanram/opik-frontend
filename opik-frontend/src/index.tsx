import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "tailwindcss/tailwind.css";

import App from "@/components/App";
import usePluginsStore from "@/store/PluginsStore";
import { APP_VERSION } from "@/constants/app";

import "./main.scss";
import { IS_SENTRY_ENABLED, SENTRY_DSN, SENTRY_MODE } from "@/config";

// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/msal/msalConfig"; // Ensure you have created the msalConfig.ts as described earlier

// other styles
import "react18-json-view/src/style.css";

// MSAL Setup
const msalInstance = new PublicClientApplication(msalConfig);

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

// Sentry setup
if (IS_SENTRY_ENABLED) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    environment: SENTRY_MODE,
    release: APP_VERSION,
  });
}

usePluginsStore.getState().setupPlugins(import.meta.env.MODE);

// Wrap your app with MsalProvider to provide MSAL context
root.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
