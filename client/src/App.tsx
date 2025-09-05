import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "./components/Toast";
import { ToastProvider } from "./contexts/ToastContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <DeviceProvider>
      <DarkModeProvider>
        <ToastProvider>
          <BrowserRouter>
            <ToastContainer />
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </DarkModeProvider>
    </DeviceProvider>
  );
}

export default App;
