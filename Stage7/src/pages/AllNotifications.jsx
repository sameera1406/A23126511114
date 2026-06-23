import {
  Container,
  Select,
  MenuItem
} from "@mui/material";

import { useContext, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import NotificationCard from "../components/NotificationCard";
import Loader from "../components/Loader";

export default function AllNotifications() {

  const { notifications, loading } =
    useContext(NotificationContext);

  const [filter, setFilter] = useState("");

  if (loading) return <Loader />;

  const filtered = filter
    ? notifications.filter(
        n => n.type === filter
      )
    : notifications;

  return (
    <Container sx={{ mt: 3 }}>

      <Select
        value={filter}
        displayEmpty
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Placement">
          Placement
        </MenuItem>
        <MenuItem value="Result">
          Result
        </MenuItem>
        <MenuItem value="Event">
          Event
        </MenuItem>
      </Select>

      {filtered.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
        />
      ))}

    </Container>
  );
}