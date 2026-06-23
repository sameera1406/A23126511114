import {
  Container,
  Typography
} from "@mui/material";

import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import NotificationCard from "../components/NotificationCard";

export default function PriorityNotifications() {

  const { notifications } =
    useContext(NotificationContext);

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const sorted = [...notifications]
    .sort(
      (a, b) =>
        weights[b.type] - weights[a.type]
    )
    .slice(0, 10);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">
        Top Priority Notifications
      </Typography>

      {sorted.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
        />
      ))}
    </Container>
  );
}