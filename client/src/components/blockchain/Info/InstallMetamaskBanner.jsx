import { Box, Button, Typography } from "@mui/joy";
import { Link, Stack } from "@mui/material";

const InstallMetamaskBanner = () => {
  return (
    <Stack width={1} spacing={1} alignItems="center" justifyContent="center">
      <Typography level="h6">
        Please install MetaMask and connect your account
      </Typography>
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/240px-MetaMask_Fox.svg.png"
      />
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://metamask.io/download/"
      >
        <Button variant="soft">Install MetaMask</Button>
      </Link>
    </Stack>
  );
};

export default InstallMetamaskBanner;
