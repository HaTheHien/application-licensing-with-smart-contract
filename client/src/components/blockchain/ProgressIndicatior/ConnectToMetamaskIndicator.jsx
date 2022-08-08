import { Box, Typography } from "@mui/joy";
import { LinearProgress, Stack } from "@mui/material";

const ConnectToMetamaskIndicator = () => {
  return (
    <Stack width={1} spacing={1} justifyContent="center" alignItems="center">
      <Typography level="h6">Connecting with Metamask</Typography>
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/240px-MetaMask_Fox.svg.png"
      />
      <LinearProgress sx={{ width: 1 }} />
    </Stack>
  );
};

export default ConnectToMetamaskIndicator;
