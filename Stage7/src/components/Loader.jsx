import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box textAlign="center" mt={5}>
      <CircularProgress />
    </Box>
  );
}