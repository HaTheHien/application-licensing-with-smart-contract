import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Button, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import {
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { AppManagementTab, MarketplaceTab } from "components/app";
import { LicenseManagementTab } from "components/license";
import { useLicenseManagementContext } from "context/LicenseManagementContext";
import { useCallback, useState } from "react";

const Home = () => {
  const [index, setIndex] = useState(0);
  const changeTab = useCallback((e, value) => setIndex(value), []);

  const {
    state: {
      isPurchaseProcessing,
      isPurchaseStatusDialogOpened,
      isPurchaseFailed,
    },
    dispatch: licenseDispatch,
  } = useLicenseManagementContext();

  const onStatusDialogClosed = useCallback(() => {
    licenseDispatch({ type: "SET_IS_PURCHASE_DIALOG_OPENED", payload: false });
  }, [licenseDispatch]);

  return (
    <>
      <Container sx={{ minHeight: 1000 }}>
        <Tabs size="lg" value={index} onChange={changeTab}>
          <TabList variant="outlined">
            <Tab
              variant={index === 0 ? "soft" : "plain"}
              color={index === 0 ? "primary" : "neutral"}
              sx={{ boxShadow: "none" }}
            >
              🏪 Buy licenses
            </Tab>

            <Tab
              variant={index === 1 ? "soft" : "plain"}
              color={index === 1 ? "info" : "neutral"}
              sx={{ boxShadow: "none" }}
            >
              📜 My licences
            </Tab>

            <Tab
              variant={index === 2 ? "soft" : "plain"}
              color={index === 2 ? "warning" : "neutral"}
              sx={{ boxShadow: "none" }}
            >
              📦 My published apps
            </Tab>
          </TabList>

          <TabPanel value={0}>
            <MarketplaceTab />
          </TabPanel>

          <TabPanel value={1}>
            <LicenseManagementTab />
          </TabPanel>

          <TabPanel value={2}>
            <AppManagementTab />
          </TabPanel>
        </Tabs>
      </Container>

      <Dialog open={!!isPurchaseProcessing} onClose={null}>
        <DialogTitle>Loading</DialogTitle>
        <DialogContent>
          <Stack width={1} direction="row" spacing={2} alignItems="center">
            <CircularProgress />
            <Typography>Processing your purchase</Typography>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPurchaseStatusDialogOpened && !isPurchaseFailed}
        onClose={onStatusDialogClosed}
      >
        <DialogTitle>Purchase successfully</DialogTitle>
        <DialogContent>
          <Stack width={1} direction="column" spacing={2} alignItems="center">
            <CheckCircleIcon
              sx={{
                fontSize: "6rem",
                color: (theme) => theme.vars.palette.success.main,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onStatusDialogClosed} variant="plain">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isPurchaseStatusDialogOpened && isPurchaseFailed}
        onClose={onStatusDialogClosed}
      >
        <DialogTitle>Purchase failed</DialogTitle>
        <DialogContent>
          <Stack width={1} direction="column" spacing={2} alignItems="center">
            <ErrorIcon
              sx={{
                fontSize: "6rem",
                color: (theme) => theme.vars.palette.danger[500],
              }}
            />

            <Typography>
              Something went wrong. Your payment was unable to process. Please
              try again later.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onStatusDialogClosed} variant="plain">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
