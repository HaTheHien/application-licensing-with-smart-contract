import { GlobalRouter } from "routes";
import { theme } from "utils/theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { EtherContextProvider } from "context";

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <EtherContextProvider>
        <GlobalRouter />
      </EtherContextProvider>
    </CssVarsProvider>
  );
};

export default App;
