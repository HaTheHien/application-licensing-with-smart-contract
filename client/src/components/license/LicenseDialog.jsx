import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Button, Sheet, Typography } from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppManagementContext, useEtherContext } from "context";
import { useAppItem, useLicenseItem } from "hooks";
import PropTypes from "prop-types";
import { licenseType } from "types";

const LicenseDialog = ({ license, open, onClose, onTransferButtonClicked }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    state: { web3, accounts },
  } = useEtherContext();

  const {
    state: { allApps },
  } = useAppManagementContext();

  const { app, formatExpiredDate, validUntil, isEligible } = useLicenseItem(
    license,
    allApps
  );

  const { formattedPrice, formattedDateCreated } = useAppItem(
    app,
    web3,
    accounts
  );

  return (
    <Dialog open={!!open} onClose={onClose} fullScreen={fullScreen}>
      {license && (
        <>
          <DialogTitle sx={{ minWidth: 400 }} component={Sheet}>
            <Typography level="h2" fontSize="x-large" fontWeight="bold" pb={2}>
              📜 License for {app?.name}
            </Typography>
            <Divider />
          </DialogTitle>

          <DialogContent>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">🆔 ID</Typography>
                <Typography
                  level="caption"
                  fontFamily="monospace"
                  noWrap
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {license.appId}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">👤 By</Typography>
                <Typography
                  level="caption"
                  fontFamily="monospace"
                  noWrap
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {app?.owner}
                </Typography>
              </Stack>

              {isEligible && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.25}
                  width={1}
                >
                  <CheckCircleIcon color="success" />
                  <Typography color="success">Valid ({validUntil})</Typography>
                </Stack>
              )}

              {!isEligible && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.25}
                  width={1}
                >
                  <ErrorIcon color="danger" />
                  <Typography color="danger">Expired</Typography>
                </Stack>
              )}

              {!isEligible && <Typography>License expired</Typography>}

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📅 Expiration date</Typography>
                <Typography>{formatExpiredDate}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📅 App Upload date</Typography>
                <Typography>{formattedDateCreated}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">🪙 App Price</Typography>
                <Typography>{formattedPrice}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📦 App Version</Typography>
                <Typography>
                  {app.version} {app.version === 0 && " - First version"}{" "}
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{ flexDirection: "column", alignItems: "end", rowGap: 0.5 }}
          >
            <Divider flexItem />
            <Button
              onClick={onTransferButtonClicked}
              color="danger"
              variant="plain"
            >
              Transfer
            </Button>
            <Button onClick={onClose} autoFocus variant="plain">
              OK
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

LicenseDialog.propTypes = {
  open: PropTypes.bool,
  license: licenseType,
  onClose: PropTypes.func,
  onTransferButtonClicked: PropTypes.func,
};

export default LicenseDialog;
