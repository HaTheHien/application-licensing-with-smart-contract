import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Sheet, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { Divider, Stack } from "@mui/material";
import { useAppManagementContext } from "context";
import { useLicenseItem } from "hooks";
import PropTypes from "prop-types";
import { licenseType } from "types";

const LicenseItem = ({ license, onClick, ...others }) => {
  // const {
  //   state: { web3, accounts },
  // } = useEtherContext();

  const {
    state: { allApps },
  } = useAppManagementContext();

  const { isEligible, appName, formatExpiredDate, validUntil } = useLicenseItem(
    license,
    allApps
  );

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
      <Stack direction="column" spacing={0.5} alignItems="baseline" width={1}>
        <Typography level="h2" fontSize="x-large" fontWeight="bold">
          📜 {appName}
        </Typography>

        <Divider flexItem />
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
            {license.appId}
          </Typography>
        </Sheet>
      </Stack>

      {isEligible && (
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={0.25}
          width={1}
          pb={2}
        >
          <CheckCircleIcon color="success" />
          <Typography color="success">Valid</Typography>
        </Stack>
      )}

      {!isEligible && (
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={0.25}
          width={1}
          pb={2}
        >
          <ErrorIcon color="danger" />
          <Typography color="danger">Expired</Typography>
        </Stack>
      )}

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
          justifyContent: "end",
        }}
      >
        {isEligible && (
          <Typography level="caption">
            Valid until {formatExpiredDate} ({validUntil})
          </Typography>
        )}

        {!isEligible && (
          <Typography level="caption">License expired</Typography>
        )}
      </CardOverflow>
    </Card>
  );
};

LicenseItem.propTypes = {
  license: licenseType,
  onClick: PropTypes.func,
};

export default LicenseItem;
