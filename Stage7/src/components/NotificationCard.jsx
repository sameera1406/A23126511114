import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack
} from "@mui/material";

export default function NotificationCard({ notification }) {

  let viewed =
    JSON.parse(localStorage.getItem("viewed")) || [];

  const isViewed = viewed.includes(notification.id);

  if (!isViewed) {
    viewed.push(notification.id);
    localStorage.setItem(
      "viewed",
      JSON.stringify(viewed)
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>

        <Typography variant="h6">
          {notification.title}
        </Typography>

        <Typography>
          {notification.message}
        </Typography>

        <Stack direction="row" spacing={1} mt={2}>
          <Chip label={notification.type} />

          <Chip
            label={isViewed ? "VIEWED" : "NEW"}
            color={isViewed ? "success" : "error"}
          />
        </Stack>

      </CardContent>
    </Card>
  );
}