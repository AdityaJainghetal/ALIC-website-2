import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// App and store


// Toast notifications
import { ToastContainer } from "react-toastify";

// CSS imports
import "./style.css"; // Your main custom styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/fontawesome.min.css";
import "./assets/css/animate.css";
import "./assets/css/jquery-ui.min.css";
import "./assets/css/style.css";

// JS imports (Bootstrap & jQuery UI)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/js/jquery-ui.min.js";
import { Provider } from "react-redux";
import { store } from "./pages/Redux/Store.js";
import App from "./App.jsx";

// Render the app
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={5000} />
      <App />
    </Provider>
  </BrowserRouter>
);
