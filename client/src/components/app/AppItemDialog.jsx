import { Button, Sheet, Typography } from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { appType } from "types";

const AppItemDialog = ({ app, open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onClose = useCallback(() => openChanged?.call(false), [openChanged]);

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
            <DialogContentText></DialogContentText>
            <DialogActions>
              <Button onClick={onClose} autoFocus variant="soft">
                OK
              </Button>
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
