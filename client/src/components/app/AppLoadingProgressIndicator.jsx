import { Typography } from "@mui/joy";
import { LinearProgress, Stack } from "@mui/material";

const AppLoadingProgressIndicator = () => {
  return (
    <Stack
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography level="h1">📦</Typography>
      <Typography level="h4">Loading apps...</Typography>
      <LinearProgress sx={{ width: 1 }} />
    </Stack>
  );
};

export default AppLoadingProgressIndicator;
