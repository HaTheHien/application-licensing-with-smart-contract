import Add from "@mui/icons-material/Add";
import { Box, Button, Link, Typography } from "@mui/joy";
import { Stack } from "@mui/material";
import { AppItemDialog } from "components/app";
import AdminAppItem from "components/app/AdminAppItem";
import AppLoadingProgressIndicator from "components/app/AppLoadingProgressIndicator";
import CreateAppDialog from "components/app/CreateAppDialog";
import EditAppDialog from "components/app/EditAppDialog";
import { useAppManagementContext } from "context";
import { useCallback, useMemo, useState } from "react";

const AppManagementTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appDialogOpen, setAppDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const {
    state: { allPublishedApps, isLoading },
  } = useAppManagementContext();

  const onCreateButtonClicked = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const displayedApps = useMemo(() => {
    return allPublishedApps.filter((app) => app?.isVisible === true);
  }, [allPublishedApps]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        {isLoading && <AppLoadingProgressIndicator />}
        {!isLoading && (
          <>
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

            {displayedApps.length === 0 && (
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

            {displayedApps.map((app) => (
              <Box pt={1} key={app.id}>
                <AdminAppItem
                  app={app}
                  onClick={() => {
                    setSelectedApp(app);
                    setAppDialogOpen(true);
                  }}
                  onEditButtonClicked={(e) => {
                    e.stopPropagation();
                    setSelectedApp(app);
                    setEditDialogOpen(true);
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

      <EditAppDialog
        open={editDialogOpen}
        openChanged={useCallback((isOpen) => {
          setEditDialogOpen(isOpen);
          if (!isOpen) {
            setSelectedApp(null);
          }
        }, [])}
        app={selectedApp}
      />
    </>
  );
};

export default AppManagementTab;
