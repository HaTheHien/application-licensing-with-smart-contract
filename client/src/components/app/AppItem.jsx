import PropTypes from "prop-types";
import { appType } from "types";
import Card from "@mui/joy/Card";
import { Divider, Stack } from "@mui/material";
import { Button, Sheet, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import { ethers } from "ethers";
import dayjs from "dayjs";
import DownloadIcon from "@mui/icons-material/Download";
import relativeTime from "dayjs/plugin/relativeTime";
import IconButton from "@mui/joy/IconButton";

dayjs.extend(relativeTime);

const AppItem = ({ app, onClick }) => {
  return (
    <Card
      onClick={onClick}
      variant="outlined"
      sx={{
        borderColor: "transparent",
        borderWidth: "2px",
        transition: "transform 0.3s, border 0.3s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "md",
          borderColor: "primary.outlinedHoverBorder",
          borderWidth: "2px",
          cursor: "pointer",
        },
        overflow: "hidden",
        boxShadow: "xs",
      }}
    >
      <Stack direction="row" spacing={1} my={1}>
        <Stack direction="column" spacing={0.5} alignItems="baseline" width={1}>
          <Typography level="h2" fontSize="x-large" fontWeight="bold">
            📦 {app.name}
          </Typography>

          <Divider flexItem />
        </Stack>
      </Stack>

      <Stack direction="row">
        <Typography fontSize="lg" fontWeight="lg">
          🪙{" "}
          {ethers.utils.formatEther(BigInt(app.price)).slice(0, 8).toString()}{" "}
          ETH
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.5} width={1}>
        <Typography>ID</Typography>
        <Sheet
          variant="soft"
          p={1}
          sx={{
            width: 1,
            borderRadius: "8px",
          }}
        >
          <Typography
            level="caption"
            fontFamily="monospace"
            noWrap
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {app.id}
          </Typography>
        </Sheet>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.5} width={1}>
        <Typography>By</Typography>
        <Sheet
          variant="soft"
          p={1}
          sx={{
            width: 1,
            borderRadius: "8px",
          }}
        >
          <Typography
            level="caption"
            fontFamily="monospace"
            noWrap
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {app.owner}
          </Typography>
        </Sheet>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        spacing={1}
        py={2}
      >
        <IconButton variant="soft" size="sm">
          <DownloadIcon />
        </IconButton>
        <Button variant="solid" size="sm">
          Buy license
        </Button>
      </Stack>

      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          borderTop: "1px solid",
          borderColor: "neutral.outlinedBorder",
          bgcolor: "background.level1",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography level="caption">Version {app.version}</Typography>
        <Typography level="caption">{dayjs(app.date).from()}</Typography>
      </CardOverflow>
    </Card>
  );
};

AppItem.propTypes = {
  app: appType,
  onClick: PropTypes.func,
};

export default AppItem;
