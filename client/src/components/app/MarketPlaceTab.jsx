import { Typography } from "@mui/joy";
import { Grid, Stack } from "@mui/material";
import AppLoadingProgressIndicator from "components/app/AppLoadingProgressIndicator";
import { AppItem, AppItemDialog } from "components/app/index";
import { BuyLicenseDialog } from "components/license";
import { useAppManagementContext } from "context";
import { useCallback, useState } from "react";

const MarketPlaceTab = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [appDialogOpen, setAppDialogOpen] = useState(false);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  const {
    state: { allApps, isLoading },
    purchaseLicense,
  } = useAppManagementContext();

  const purchaseLicenseCb = useCallback(async () => {
    setPurchaseDialogOpen(false);
    console.log(selectedApp);
    if (selectedApp) {
      await purchaseLicense(selectedApp);
    }
  }, [purchaseLicense, selectedApp]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography level="h6" textAlign="center">
          🚧 Under construction
        </Typography>

        {isLoading && <AppLoadingProgressIndicator />}

        {!isLoading && (
          <>
            <Grid container py={2}>
              {allApps.map((app, idx) => (
                <Grid item xs={4} key={idx} px={0.5} py={0.5}>
                  <AppItem
                    app={app}
                    onClick={() => {
                      setSelectedApp(app);
                      setAppDialogOpen(true);
                    }}
                    onPurchaseButtonClicked={(e) => {
                      setSelectedApp(app);
                      e?.stopPropagation();
                      setPurchaseDialogOpen(true);
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {allApps.length === 0 && (
              <Stack
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography level="h1">📦</Typography>
                <Typography level="h4">
                  There is no any apps on the marketplace yet
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>

      <AppItemDialog
        openChanged={setAppDialogOpen}
        open={appDialogOpen}
        app={selectedApp}
        onPurchaseButtonClicked={useCallback(() => {
          setAppDialogOpen(false);
          setPurchaseDialogOpen(true);
        }, [])}
      />

      <BuyLicenseDialog
        open={purchaseDialogOpen}
        openChanged={setPurchaseDialogOpen}
        app={selectedApp}
        onPurchaseButtonClicked={purchaseLicenseCb}
      />
    </>
  );
};

export default MarketPlaceTab;
