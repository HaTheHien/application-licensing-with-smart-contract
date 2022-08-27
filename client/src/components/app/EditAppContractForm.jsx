import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, FormLabel, Sheet, TextField, Typography } from "@mui/joy";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { ETHER_SYMBOL, LICENSE_LIFE_TIME_UNIT } from "utils";

const EditAppContractForm = ({ onRemoveButtonClicked }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
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

      <Accordion
        component={Sheet}
        variant="outlined"
        sx={{ boxShadow: "none", mt: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Advanced actions</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Button color="danger" fullWidth onClick={onRemoveButtonClicked}>
            Delete app
          </Button>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

EditAppContractForm.propTypes = {
  onRemoveButtonClicked: PropTypes.func,
};

export default EditAppContractForm;
