import { Button, Sheet, TextField, Typography } from "@mui/joy";
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
import { useEtherContext } from "context";
import { useLicenseManagementContext } from "context/LicenseManagementContext";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { licenseType } from "types";

const TransferLicenseDialog = ({ open, license, openChanged }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    state: { web3, accounts },
  } = useEtherContext();

  const {
    state: { licenseAddresses, licenses },
    transferLicense,
  } = useLicenseManagementContext();

  const onClose = useCallback(() => openChanged?.call(false), [openChanged]);
  const confirmKeyword = useMemo(() => {
    return accounts && accounts?.length > 0 ? accounts[0] : "sandwiches";
  }, [accounts]);

  const {
    control,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      address: "",
      confirmKeyword: "",
    },
    mode: "onTouched",
  });

  const confirmKeywordLabel = useMemo(() => {
    return `Type ${confirmKeyword} to confirm.`;
  }, [confirmKeyword]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = useCallback(async () => {
    await handleSubmit(
      async (data) => {
        openChanged?.call(false);
        const idx = licenses?.findIndex((l) => l.appId === license?.appId);
        // console.log(idx);

        if (idx !== -1) {
          await transferLicense(licenseAddresses[idx], data.address);
        } else {
          console.error("License not found");
        }
      },
      (errors) => {
        console.log(errors);
      }
    )();
  }, [
    handleSubmit,
    license?.appId,
    licenseAddresses,
    licenses,
    openChanged,
    transferLicense,
  ]);

  return (
    <Dialog open={!!open} onClose={onClose} fullScreen={fullScreen}>
      {license && (
        <>
          <DialogTitle sx={{ minWidth: 400 }} component={Sheet}>
            <Typography level="h2" fontSize="x-large" fontWeight="bold" pb={2}>
              Transfer ownership
            </Typography>
            <Divider />
          </DialogTitle>

          <DialogContent>
            <Stack direction="column" spacing={2}>
              <Controller
                control={control}
                name="address"
                rules={{
                  required: "Please enter new owner's address",
                  validate: {
                    validAddress: (v) =>
                      web3?.utils?.isAddress(v) || "Invalid address",
                    isMyself: (v) =>
                      !accounts ||
                      accounts?.length === 0 ||
                      accounts[0] !== v ||
                      "You cannot transfer license to yourself",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    label="New owner’s address"
                    placeholder="0x06D42f5dd424DE743cc2c2A09E9452615cf8d2C0"
                    size="md"
                    variant="outlined"
                    color="primary"
                    startDecorator={<Typography>🪪</Typography>}
                    fullWidth
                    error={!!errors["address"]}
                    helperText={errors?.address?.message || ""}
                  />
                )}
              />

              <Divider flexItem sx={{ width: 1 }} />

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

          <DialogActions sx={{ flexDirection: "column", rowGap: 0.5 }}>
            <Button
              disabled={!isValid}
              onClick={onSubmit}
              color="danger"
              fullWidth
            >
              I understand, transfer this license
            </Button>

            <Button onClick={onClose} autoFocus variant="plain" fullWidth>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

TransferLicenseDialog.propTypes = {
  open: PropTypes.bool,
  openChanged: PropTypes.func,
  license: licenseType,
};
export default TransferLicenseDialog;
