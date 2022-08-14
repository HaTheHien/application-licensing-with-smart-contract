import { Button, Sheet, TextField, Typography } from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField as MuiTextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppManagementContext, useEtherContext } from "context";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ETHER_SYMBOL } from "utils";

const CreateAppDialog = ({ open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { createNewApp } = useAppManagementContext();

  const {
    state: { web3 },
  } = useEtherContext();

  const {
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      id: "",
      packageName: "",
      name: "",
      dateCreated: 0,
      // contentHash: "",
      // owner: "",
      content: "",
      version: 0,
      price: "",
      formattedPrice: null,
    },
    mode: "onBlur",
  });

  const submit = useCallback(async () => {
    try {
      setValue("dateCreated", Date.now());
      const packageName = getValues("packageName");
      setValue("id", web3.utils.toBN(web3.utils.soliditySha3(packageName)));
      // setValue("id", ethers.utils.id(packageName));
      setValue("formattedPrice", web3.utils.toWei(getValues("price"), "ether"));

      await trigger();
      if (isValid) {
        await handleSubmit(
          async (data) => {
            console.log(data);
            openChanged?.call(false);
            await createNewApp(data);
            reset();
          },
          (errors) => console.log(errors)
        )();
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    createNewApp,
    getValues,
    handleSubmit,
    isValid,
    openChanged,
    reset,
    setValue,
    trigger,
    web3?.utils,
  ]);

  const onClose = useCallback(() => {
    reset();
    openChanged?.call(false);
  }, [openChanged, reset]);

  return (
    <Dialog open={!!open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle sx={{ minWidth: 400 }} component={Sheet}>
        <Typography level="h6" sx={{ pb: 1 }}>
          ➕ Create new app
        </Typography>
        <Divider />
      </DialogTitle>

      <DialogContent>
        <Stack width={1} direction="column" spacing={1}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Please choose a name for your application" }}
            render={({ field }) => (
              <TextField
                required
                {...field}
                label="App name"
                placeholder="Your app name (Eg. Gallery One)"
                size="md"
                variant="outlined"
                color="primary"
                startDecorator={<Typography>🪪</Typography>}
                fullWidth
                error={!!errors["name"]}
                helperText={errors?.name?.message || ""}
              />
            )}
          />

          <Controller
            control={control}
            name="packageName"
            rules={{
              required: "Please choose a package name for your application",
            }}
            render={({ field }) => (
              <TextField
                required
                {...field}
                label="Package name"
                placeholder="com.example.application"
                size="md"
                variant="outlined"
                startDecorator={<Typography>📦</Typography>}
                fullWidth
                error={!!errors["packageName"]}
                helperText={errors?.packageName?.message || ""}
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            rules={{
              required: "Please enter license price for your application",
            }}
            render={({ field }) => (
              <TextField
                required
                {...field}
                label="License price"
                placeholder="5 "
                size="md"
                variant="outlined"
                startDecorator={<Typography>🪙</Typography>}
                endDecorator={<Typography>{ETHER_SYMBOL}</Typography>}
                fullWidth
                error={!!errors["price"]}
                helperText={
                  errors?.price?.message ||
                  `Currency is ETH ${ETHER_SYMBOL}, Enter 0 when the license is free`
                }
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            rules={{ required: "Please describe your application" }}
            render={({ field }) => (
              <MuiTextField
                required
                {...field}
                label="Description"
                size="md"
                variant="outlined"
                color="primary"
                // startDecorator={<Typography>ℹ</Typography>}
                fullWidth
                multiline
                rows={4}
                error={!!errors["description"]}
                helperText={errors?.description?.message || ""}
              />
            )}
          />
        </Stack>

        <DialogActions>
          <Button onClick={onClose} autoFocus variant="text">
            Cancel
          </Button>

          <Button onClick={submit} autoFocus variant="soft">
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

CreateAppDialog.propTypes = {
  open: PropTypes.bool,
  openChanged: PropTypes.func,
};

export default CreateAppDialog;
