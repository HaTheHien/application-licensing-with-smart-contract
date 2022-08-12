import Add from "@mui/icons-material/Add";
import { Box, Button } from "@mui/joy";
import { Stack } from "@mui/material";
import CreateAppDialog from "components/app/CreateAppDialog";
import { useCallback, useState } from "react";

const AppManagementTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Stack direction="column" spacing={1} py={1}>
        <Box width={1} display="flex" justifyContent="end">
          <Button
            color="primary"
            size="lg"
            variant="soft"
            startIcon={<Add />}
            onClick={useCallback(() => {
              setDialogOpen(true);
            }, [])}
          >
            Create app
          </Button>
        </Box>
      </Stack>

      <CreateAppDialog openChanged={setDialogOpen} open={dialogOpen} />
    </>
  );
};

export default AppManagementTab;
