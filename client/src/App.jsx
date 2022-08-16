import AppManagementContextProvider from "context/AppManagementContext";
import LicenseManagementContextProvider from "context/LicenseManagementContext";
import { GlobalRouter } from "routes";
import { theme } from "utils/theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { EtherContextProvider } from "context";

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <EtherContextProvider>
        <LicenseManagementContextProvider>
          <AppManagementContextProvider>
            <GlobalRouter />
          </AppManagementContextProvider>
        </LicenseManagementContextProvider>
      </EtherContextProvider>
    </CssVarsProvider>
  );
};

export default App;
