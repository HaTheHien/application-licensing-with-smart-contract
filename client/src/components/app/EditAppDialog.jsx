import {
  Button,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
  Typography,
} from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditAppContractForm from "components/app/EditAppContractForm";
import EditAppFiles from "components/app/EditAppFiles";
import { useAppManagementContext, useEtherContext } from "context";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { appType } from "types";
import { LICENSE_LIFE_TIME_UNIT } from "utils";

dayjs.extend(duration);

const EditAppDialog = ({ app, open, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    state: { web3, accounts },
  } = useEtherContext();
  const [index, setIndex] = useState(0);
  const changeTab = useCallback((e, value) => setIndex(value), []);

  const { editApp, removeApp } = useAppManagementContext();

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
      uploadFile: null,
    }),
    [app, web3?.utils]
  );

  const form = useForm({
    defaultValues: formValue,
    mode: "onBlur",
  });

  const {
    formState: { isValid, errors },
    control,
    handleSubmit,
    clearErrors,
    reset,
  } = form;

  useEffect(() => {
    if (!app) {
      clearErrors();
      reset(formValue);
    } else {
      reset(formValue);
    }
  }, [app, clearErrors, formValue, reset]);

  const onClose = useCallback(() => {
    openChanged?.call(false);
    clearErrors();
    // reset();
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

  const onRemoveButtonClicked = useCallback(async () => {
    await removeApp(app?.appAddress);
    onClose();
  }, [app?.appAddress, onClose, removeApp]);

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
            <Tabs
              size="md"
              value={index}
              onChange={changeTab}
              sx={{ minHeight: 500, minWidth: 500 }}
            >
              <TabList variant="outlined">
                <Tab
                  variant={index === 0 ? "soft" : "plain"}
                  color={index === 0 ? "primary" : "neutral"}
                  sx={{ boxShadow: "none", flex: 1 }}
                >
                  📜 Application contract
                </Tab>

                <Tab
                  variant={index === 1 ? "soft" : "plain"}
                  color={index === 1 ? "info" : "neutral"}
                  sx={{ boxShadow: "none", flex: 1 }}
                >
                  📂 Metadata
                </Tab>
              </TabList>

              <FormProvider {...form}>
                <TabPanel value={0}>
                  <EditAppContractForm
                    onRemoveButtonClicked={onRemoveButtonClicked}
                  />
                </TabPanel>

                <TabPanel value={1}>
                  <EditAppFiles />
                </TabPanel>
              </FormProvider>
            </Tabs>
          </DialogContent>

          <Divider sx={{ mb: 1 }} />

          <DialogActions>
            <Stack direction="column" spacing={0.5} width={1} px={2}>
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
                    sx={{ pb: 2 }}
                  />
                )}
              />

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
