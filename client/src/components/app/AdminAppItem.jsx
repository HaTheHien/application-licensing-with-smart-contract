import DownloadIcon from "@mui/icons-material/Download";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Link, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import { Divider, Stack } from "@mui/material";
import { useEtherContext } from "context";
import dayjs from "dayjs";
import { useAppItem } from "hooks";
import PropTypes from "prop-types";
import { IpfsService } from "services";
import { appType } from "types";

const AdminAppItem = ({ app, onClick, onEditButtonClicked, ...others }) => {
  const {
    state: { web3, accounts },
  } = useEtherContext();

  const { isDownloadable, isAppOwner, formattedPrice, validTimeText } =
    useAppItem(app, web3, accounts);

  return isAppOwner ? (
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
        <Typography>Address</Typography>

        <Typography
          level="caption"
          fontFamily="monospace"
          noWrap
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {app.appAddress}
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
        <IconButton variant="solid" size="sm" onClick={onEditButtonClicked}>
          <ModeEditOutlineOutlinedIcon />
        </IconButton>

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
  ) : null;
};

AdminAppItem.propTypes = {
  app: appType,
  onClick: PropTypes.func,
  onEditButtonClicked: PropTypes.func,
};

export default AdminAppItem;
