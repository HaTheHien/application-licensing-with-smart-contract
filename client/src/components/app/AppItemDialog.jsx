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
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useAppItem } from "hooks";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { appType } from "types";
import { ETHER_SYMBOL } from "utils";

dayjs.extend(LocalizedFormat);

const AppItemDialog = ({ app, open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    state: { web3, accounts },
  } = useEtherContext();

  const onClose = useCallback(() => openChanged?.call(false), [openChanged]);
  const { isAppOwner } = useAppItem(app, accounts);

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
                <Typography fontWeight="bold">👤 By</Typography>
                <Typography
                  level="caption"
                  fontFamily="monospace"
                  noWrap
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {app.owner}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">🪙 Price</Typography>
                <Typography>
                  {web3.utils.fromWei(app.price).toString()} {ETHER_SYMBOL}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📅 Upload date</Typography>
                <Typography>{dayjs(app.date).format("LLLL")}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontWeight="bold">📦 Version</Typography>
                <Typography>
                  {app.version} {app.version === 0 && " - First version"}{" "}
                </Typography>
              </Stack>
            </Stack>

            <DialogActions>
              <Button onClick={onClose} autoFocus variant="soft">
                OK
              </Button>

              {!isAppOwner && <Button variant="solid">Buy license</Button>}
            </DialogActions>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

AppItemDialog.propTypes = {
  app: appType,
  open: PropTypes.bool,
  openChanged: PropTypes.func,
};

export default AppItemDialog;
