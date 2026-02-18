import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/theme.css";
import { SavedProvider } from "./context/SavedContext.jsx";

createRoot(document.getElementById("root")).render(
  <SavedProvider>
    <App />
  </SavedProvider>,
);
