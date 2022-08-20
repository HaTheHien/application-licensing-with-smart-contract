import { Button, Sheet, Typography } from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEtherContext } from "context";
import { useAppItem } from "hooks";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { appType } from "types";

const BuyLicenseDialog = ({
  app,
  open,
  openChanged,
  onPurchaseButtonClicked,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onClose = useCallback(() => openChanged?.call(false), [openChanged]);

  const {
    state: { web3, accounts },
  } = useEtherContext();
  const { formattedPrice } = useAppItem(app, web3, accounts);

  return (
    <Dialog open={!!open} onClose={onClose} fullScreen={fullScreen}>
      {app && (
        <>
          <DialogTitle sx={{ minWidth: 400 }} component={Sheet}>
            <Typography level="h2" fontSize="x-large" fontWeight="bold" pb={2}>
              💳 Purchase license
            </Typography>
            <Divider />
          </DialogTitle>

          <DialogContent>
            <Typography>
              Do you want to buy {app.name} license for <b>{formattedPrice}</b>?
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} autoFocus variant="plain">
              No
            </Button>

            <Button variant="solid" onClick={onPurchaseButtonClicked}>
              Yes
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

BuyLicenseDialog.propTypes = {
  app: appType,
  open: PropTypes.bool,
  openChanged: PropTypes.func,
  onPurchaseButtonClicked: PropTypes.func,
};

export default BuyLicenseDialog;
