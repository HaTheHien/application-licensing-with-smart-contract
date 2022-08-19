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
import { useAppManagementContext, useEtherContext } from "context";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { appType } from "types";
import { ETHER_SYMBOL, LICENSE_LIFE_TIME_UNIT } from "utils";

dayjs.extend(duration);

const EditAppDialog = ({ app, open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    state: { web3, accounts },
  } = useEtherContext();
  const { editApp } = useAppManagementContext();

  const confirmKeyword = useMemo(() => {
    return accounts && accounts?.length > 0 ? accounts[0] : "sandwiches";
  }, [accounts]);

  const confirmKeywordLabel = useMemo(() => {
    return `Type ${confirmKeyword} to confirm.`;
  }, [confirmKeyword]);

  const formValue = useMemo(
    () => ({
      ...app,
      priceInEther: app?.price
        ? web3?.utils.fromWei(app?.price, "ether").toString()
        : undefined,
      lifetimeUnit: LICENSE_LIFE_TIME_UNIT.days.value,
      lifetimeAmount: dayjs.duration(app?.licenseLifeTime ?? 0, "s").asDays(),
      confirmKeyword: "",
    }),
    [app, web3?.utils]
  );

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: formValue,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(formValue);
    clearErrors();
  }, [clearErrors, formValue, reset]);

  const onClose = useCallback(() => {
    openChanged?.call(false);
    clearErrors();
  }, [clearErrors, openChanged]);

  const onSubmit = useCallback(async () => {
    try {
      openChanged?.call(false);
      await handleSubmit(
        async (data) => {
          console.log(data);
          await editApp(data);
        },
        (errors) => {
          console.log(errors);
        }
      )();
    } catch (e) {
      console.error(e);
    }
  }, [editApp, handleSubmit, openChanged]);

  return (
    <Dialog open={!!open} fullScreen={fullScreen} onClose={onClose}>
      {app && (
        <>
          <DialogTitle sx={{ minWidth: 400 }} component={Sheet}>
            <Typography level="h6" sx={{ pb: 1 }}>
              ✏️ Edit app
            </Typography>
            <Divider />
          </DialogTitle>

          <DialogContent>
            <Stack direction="column" spacing={2}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Please choose a name for your application",
                }}
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
                name="priceInEther"
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

              <Controller
                control={control}
                name="confirmKeyword"
                rules={{
                  required: "Please enter the confirm keyword",
                  validate: {
                    matchConfirmKeyword(v) {
                      return v === confirmKeyword || "Wrong confirm keyword";
                    },
                  },
                }}
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    label={confirmKeywordLabel}
                    placeholder={confirmKeyword}
                    size="md"
                    variant="outlined"
                    color="primary"
                    startDecorator={<Typography>🔑</Typography>}
                    fullWidth
                    error={!!errors["confirmKeyword"]}
                    helperText={errors?.confirmKeyword?.message || ""}
                  />
                )}
              />
            </Stack>
          </DialogContent>

          <Divider sx={{ mb: 1 }} />

          <DialogActions>
            <Stack direction="column" spacing={0.5} width={1}>
              <Button
                disabled={!isValid}
                onClick={onSubmit}
                color="danger"
                fullWidth
              >
                Edit this app
              </Button>

              <Button onClick={onClose} autoFocus variant="plain" fullWidth>
                Cancel
              </Button>
            </Stack>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

EditAppDialog.propTypes = {
  app: appType,
  open: PropTypes.bool,
  openChanged: PropTypes.func,
};

export default EditAppDialog;
