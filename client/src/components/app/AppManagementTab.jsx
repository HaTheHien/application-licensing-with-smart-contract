import Add from "@mui/icons-material/Add";
import { Box, Button, Link, Typography } from "@mui/joy";
import { Stack } from "@mui/material";
import { AppItemDialog } from "components/app";
import AdminAppItem from "components/app/AdminAppItem";
import AppLoadingProgressIndicator from "components/app/AppLoadingProgressIndicator";
import CreateAppDialog from "components/app/CreateAppDialog";
import { useAppManagementContext } from "context";
import { useCallback, useState } from "react";

const AppManagementTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appDialogOpen, setAppDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const {
    state: { allPublishedAppAddresses, allPublishedApps, isLoading },
  } = useAppManagementContext();

  const onCreateButtonClicked = useCallback(() => {
    setDialogOpen(true);
  }, []);

  return (
    <>
      <Stack direction="column" spacing={1}>
        {isLoading && <AppLoadingProgressIndicator />}
        {!isLoading && (
          <>
            <Typography level="h6" textAlign="center">
              🚧 Under construction
            </Typography>

            <Box width={1} display="flex" justifyContent="end" pt={1}>
              <Button
                color="primary"
                size="lg"
                variant="soft"
                startIcon={<Add />}
                onClick={onCreateButtonClicked}
              >
                Create app
              </Button>
            </Box>

            {allPublishedAppAddresses.length === 0 && (
              <Stack
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography level="h1">📦</Typography>
                <Typography level="h4">You don&apos;t have any apps</Typography>
                <Typography>
                  Click <Link onClick={onCreateButtonClicked}>Create App</Link>{" "}
                  button to publish new app to the marketplace
                </Typography>
              </Stack>
            )}

            {allPublishedApps.map((app) => (
              <Box pt={1} key={app.id}>
                <AdminAppItem
                  app={app}
                  onClick={() => {
                    setSelectedApp(app);
                    setAppDialogOpen(true);
                  }}
                />
              </Box>
            ))}
          </>
        )}
      </Stack>

      <CreateAppDialog openChanged={setDialogOpen} open={dialogOpen} />

      <AppItemDialog
        openChanged={setAppDialogOpen}
        open={appDialogOpen}
        app={selectedApp}
        // onPurchaseButtonClicked={useCallback(() => {
        //   setAppDialogOpen(false);
        //   setPurchaseDialogOpen(true);
        // }, [])}
      />
    </>
  );
};

export default AppManagementTab;
