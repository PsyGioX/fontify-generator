/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initTheme } from "./hooks/useTheme";
import "./index.css";

initTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
