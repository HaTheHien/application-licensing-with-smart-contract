import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ErrorFallback } from "components/common/Error";
import { EtherContextProvider } from "context";
import AppManagementContextProvider from "context/AppManagementContext";
import LicenseManagementContextProvider from "context/LicenseManagementContext";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalRouter } from "routes";
import { theme } from "utils/theme";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CssVarsProvider theme={theme}>
        <EtherContextProvider>
          <LicenseManagementContextProvider>
            <AppManagementContextProvider>
              <GlobalRouter />
            </AppManagementContextProvider>
          </LicenseManagementContextProvider>
        </EtherContextProvider>
      </CssVarsProvider>
    </ErrorBoundary>
  );
};

export default App;
