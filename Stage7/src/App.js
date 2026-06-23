import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Navbar from "./components/Navbar";
import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";
import NotificationProvider from "./context/NotificationContext";

function App() {
  return (
    <NotificationProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<AllNotifications />}
          />

          <Route
            path="/priority"
            element={<PriorityNotifications />}
          />
        </Routes>

      </BrowserRouter>

    </NotificationProvider>
  );
}

export default App;