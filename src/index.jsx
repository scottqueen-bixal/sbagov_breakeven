import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BreakEvenCalculator from "./pages/index";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1>sba_breakeven REACT Root</h1>
    <BreakEvenCalculator />
  </StrictMode>
);
