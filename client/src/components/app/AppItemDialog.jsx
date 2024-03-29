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
import { useEtherContext } from "context";
import { useLicenseManagementContext } from "context/LicenseManagementContext";
import { useAppItem } from "hooks";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { appType } from "types";

const AppItemDialog = ({ app, open, openChanged, onPurchaseButtonClicked }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    state: { web3, accounts },
  } = useEtherContext();
  const {
    state: { licenses },
  } = useLicenseManagementContext();

  const onClose = useCallback(() => openChanged?.call(false), [openChanged]);
  const {
    isAppOwner,
    formattedPrice,
    formattedDateCreated,
    isLicenseOwner,
    validTimeText,
  } = useAppItem(app, web3, accounts, licenses);

  return (
    <Dialog open={!!open} onClose={onClose} fullScreen={fullScreen}>
      {app && (
        <>
          <DialogTitle sx={{ minWidth: 400 }} component={Sheet}>
            <Typography level="h2" fontSize="x-large" fontWeight="bold" pb={2}>
              📦 {app.name}
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
                  {app.id}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📍 Address</Typography>
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

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">👤 By</Typography>
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

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">🪙 Price</Typography>
                <Typography>{formattedPrice}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📅 Valid</Typography>
                <Typography>{validTimeText}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📅 Upload date</Typography>
                <Typography>{formattedDateCreated}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📦 Version</Typography>
                <Typography>
                  {app.version} {app.version === 0 && " - First version"}{" "}
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} autoFocus variant="soft">
              OK
            </Button>

            {!isAppOwner && !isLicenseOwner && (
              <Button variant="solid" onClick={onPurchaseButtonClicked}>
                Buy license
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

AppItemDialog.propTypes = {
  app: appType,
  open: PropTypes.bool,
  openChanged: PropTypes.func,
  onPurchaseButtonClicked: PropTypes.func,
};

export default AppItemDialog;
