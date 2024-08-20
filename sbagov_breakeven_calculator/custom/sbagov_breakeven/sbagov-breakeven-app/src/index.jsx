import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BreakEvenCalculator from "./pages/index";
import "../node_modules/semantic-ui-less/semantic.less";

createRoot(document.getElementById("sbagov-breakeven")).render(
  <StrictMode>
    <BreakEvenCalculator />
  </StrictMode>
);
