import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CssVarsProvider } from "@mui/joy/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CssVarsProvider>
    <App />
  </CssVarsProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about se  rvice workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
