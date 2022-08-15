import { Typography } from "@mui/joy";
import { Grid, Stack } from "@mui/material";
import AppLoadingProgressIndicator from "components/app/AppLoadingProgressIndicator";
import { AppItem, AppItemDialog } from "components/app/index";
import { useAppManagementContext } from "context";
import { useState } from "react";

const MarketPlaceTab = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    state: { allApps, isLoading },
  } = useAppManagementContext();

  // const {
  //   state: { accounts },
  // } = useEtherContext();

  // const displayedApp = useMemo(() => {
  //   if (!accounts) return [];
  //   return allApps.filter((app) => app?.owner !== accounts[0]);
  // }, [accounts, allApps]);

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
                      setDialogOpen(true);
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
                  There is no any apps on the marketplace yat
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>

      <AppItemDialog
        openChanged={setDialogOpen}
        open={dialogOpen}
        app={selectedApp}
      />
    </>
  );
};

export default MarketPlaceTab;
