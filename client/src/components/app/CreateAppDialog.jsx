import { Button, FormLabel, Sheet, TextField, Typography } from "@mui/joy";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppManagementContext } from "context";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ETHER_SYMBOL, LICENSE_LIFE_TIME_UNIT } from "utils";

dayjs.extend(duration);

const CreateAppDialog = ({ open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { createNewApp } = useAppManagementContext();

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      packageName: "",
      name: "",
      dateCreated: 0,
      content: "",
      version: 0,
      price: "",
      lifetimeUnit: LICENSE_LIFE_TIME_UNIT.days.value,
      lifetimeAmount: 365,
    },
    mode: "onBlur",
  });

  const submit = useCallback(async () => {
    try {
      setValue("dateCreated", Date.now());
      await handleSubmit(
        async (data) => {
          console.log(data);
          openChanged?.call(false);
          await createNewApp({
            ...data,
            licenseLifeTime: dayjs
              .duration(+data.lifetimeAmount, data.lifetimeUnit)
              .asSeconds(),
          });
          reset();
        },
        (errors) => console.log(errors)
      )();
    } catch (e) {
      console.log(e);
    }
  }, [createNewApp, handleSubmit, openChanged, reset, setValue]);

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

          <Stack direction="row" spacing={1}>
            <Controller
              control={control}
              name="lifetimeAmount"
              rules={{
                required: "Please enter license lifetime",
              }}
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  label="License lifetime"
                  placeholder="0"
                  size="md"
                  variant="outlined"
                  startDecorator={<Typography>📅</Typography>}
                  fullWidth
                  error={!!errors["lifetimeAmount"]}
                  helperText={
                    errors?.lifetimeAmount?.message ||
                    `Enter 0 when the license lifetime is forever`
                  }
                />
              )}
            />

            <FormControl required sx={{ minWidth: 160 }}>
              <FormLabel>Unit</FormLabel>
              <Controller
                control={control}
                name="lifetimeUnit"
                render={({ field }) => (
                  <Select
                    {...field}
                    id="license-lifetime-unit-select"
                    label="Unit"
                    sx={{ mt: 0.25 }}
                  >
                    {Object.values(LICENSE_LIFE_TIME_UNIT).map((d) => (
                      <Option value={d.value} key={d.value}>
                        <Typography> {d.name}</Typography>
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors?.lifetimeUnit && (
                <Typography variant="caption" color="error" m="3px 14px">
                  {errors?.lifetimeUnit?.message}
                </Typography>
              )}
            </FormControl>
          </Stack>
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
