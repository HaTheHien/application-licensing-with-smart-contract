import { Button, Sheet, TextField, Typography, inputClasses } from "@mui/joy";
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
import { ethers } from "ethers";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

const CreateAppDialog = ({ open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    reset,
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
  });

  const submit = useCallback(async () => {
    try {
      setValue("dateCreated", Date.now());
      const packageName = getValues("packageName");
      setValue(
        "id",
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(packageName))
      );
      setValue(
        "formattedPrice",
        ethers.utils.formatUnits(getValues("price"), "ether")
      );
      if (isValid) {
        await handleSubmit(
          async (data) => {
            console.log(data);
            openChanged?.call(false);
            reset();
          },
          (errors) => console.log(errors)
        )();
      }
    } catch (e) {
      console.log(e);
    }
  }, [getValues, handleSubmit, isValid, openChanged, reset, setValue]);

  const onClose = useCallback(() => openChanged?.call(false), [openChanged]);

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
                endDecorator={
                  <Typography>{ethers.constants.EtherSymbol}</Typography>
                }
                fullWidth
                error={!!errors["price"]}
                helperText={
                  errors?.price?.message ||
                  `Currency is ETH ${ethers.constants.EtherSymbol}, Enter 0 when the license is free`
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
                className={inputClasses}
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