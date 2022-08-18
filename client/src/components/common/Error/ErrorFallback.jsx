import { Button, Typography } from "@mui/joy";
import { Link, Stack, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { ReactComponent as SadIconSvg } from "assets/error.svg";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Stack
      pt={5}
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <SvgIcon
        component={SadIconSvg}
        sx={(theme) => ({
          width: 200,
          height: 200,
          ".start-color": {
            "--color-start": theme.vars.palette.danger[400],
          },
          ".end-color": {
            "--color-stop": theme.vars.palette.danger[900],
          },
        })}
        inheritViewBox
      />

      <Typography level="h4" color="danger">
        Unexpected error occurred
      </Typography>

      <Stack direction="column" width={1} pt={4}>
        <Typography fontStyle="monospace" color="dander">
          {error.message}
        </Typography>
        <Typography fontStyle="monospace">{error.stack}</Typography>
      </Stack>

      <Stack spacing={1} direction="row" pt={2}>
        <Link sx={{ textDecoration: "none", color: "text.primary" }} href="/">
          <Button variant="solid" color="danger">
            Back to home
          </Button>
        </Link>
        <Button variant="soft" color="danger" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Stack>
    </Stack>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.any,
  resetErrorBoundary: PropTypes.any,
};

export default ErrorFallback;
