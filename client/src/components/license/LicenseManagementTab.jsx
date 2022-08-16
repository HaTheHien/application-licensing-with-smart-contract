import { Typography } from "@mui/joy";
import { Grid, Stack } from "@mui/material";
import AppLoadingProgressIndicator from "components/app/AppLoadingProgressIndicator";
import LicenseItem from "components/license/LicenseItem";
import { useLicenseManagementContext } from "context/LicenseManagementContext";

const LicenseManagementTab = () => {
  const {
    state: { isLoading, licenses },
  } = useLicenseManagementContext();

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
              {licenses.map((license, idx) => (
                <Grid item xs={4} key={idx} px={0.5} py={0.5}>
                  <LicenseItem license={license} />
                </Grid>
              ))}
            </Grid>

            {licenses.length === 0 && (
              <Stack
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography level="h1">📜</Typography>
                <Typography level="h4">
                  You don&apos;t own any licenses
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default LicenseManagementTab;
