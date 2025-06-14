import { JazzProvider } from "jazz-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { JazzInspector } from "jazz-inspector";
import { apiKey } from "./apiKey.ts";

// We use this to identify the app in the passkey auth
export const APPLICATION_NAME = "Jazz starter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JazzProvider
      sync={{
        peer: `wss://cloud.jazz.tools/?key=${apiKey}`,
      }}
    >
      <App />

      <JazzInspector />
    </JazzProvider>
  </StrictMode>,
);
