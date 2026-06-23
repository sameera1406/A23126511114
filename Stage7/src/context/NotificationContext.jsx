import { createContext, useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications()
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, loading }}
    >
      {children}
    </NotificationContext.Provider>
  );
}