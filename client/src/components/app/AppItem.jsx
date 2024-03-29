import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, Link, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import { Divider, Stack } from "@mui/material";
import { useEtherContext } from "context";
import { useLicenseManagementContext } from "context/LicenseManagementContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAppItem } from "hooks";
import PropTypes from "prop-types";
import { IpfsService } from "services";
import { appType } from "types";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const AppItem = ({ app, onClick, onPurchaseButtonClicked, ...others }) => {
  const {
    state: { web3, accounts },
  } = useEtherContext();
  const {
    state: { licenses },
  } = useLicenseManagementContext();

  const {
    isDownloadable,
    isAppOwner,
    formattedPrice,
    isLicenseOwner,
    validTimeText,
  } = useAppItem(app, web3, accounts, licenses);

  return (
    <Card
      {...others}
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
          🪙 {formattedPrice}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.5} width={1}>
        <Typography>ID</Typography>

        <Typography
          level="caption"
          fontFamily="monospace"
          noWrap
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {app.id}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.5} width={1}>
        <Typography>By</Typography>

        <Typography
          level="caption"
          fontFamily="monospace"
          noWrap
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {isAppOwner ? "me" : app.owner}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.5} width={1}>
        <Typography>Valid {validTimeText}</Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        spacing={1}
        py={2}
      >
        {isLicenseOwner && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CheckCircleIcon color="success" />
            <Typography color="success">Purchased</Typography>
          </Stack>
        )}
        {isAppOwner && <Typography>👤 My app</Typography>}

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={
            app?.contentHash
              ? IpfsService.getLinkFromCidV0(app?.contentHash)
              : null
          }
        >
          <IconButton
            variant="soft"
            size="sm"
            disabled={!isDownloadable}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Link>

        {!isAppOwner && !isLicenseOwner && (
          <Button variant="solid" size="sm" onClick={onPurchaseButtonClicked}>
            Buy license
          </Button>
        )}
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
  onPurchaseButtonClicked: PropTypes.func,
};

export default AppItem;
