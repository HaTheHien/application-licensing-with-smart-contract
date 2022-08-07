import { useCallback, useEffect, useState } from "react";
import getWeb3 from "./utils/getWeb3";
import { GlobalRouter } from "routes";
import { theme } from "utils/theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

const App = () => {
  const [web3, setWeb3] = useState(null);

  const [accounts, setAccounts] = useState(null);

  const onAccountChanged = useCallback(async () => {
    console.log("onAccountChanged");
    const changedAccounts = await web3?.eth.getAccounts();

    setAccounts(changedAccounts);
    // console.log(`New accounts ${changedAccounts}`);
    // await getFiles();
  }, [web3?.eth]);

  useEffect(() => {
    (async () => {
      // console.log("useEffect");
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);

        // console.log(accounts);
        // console.log(await getFiles());
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", onAccountChanged);
    }
    return () => {
      console.log("remove previous listener");
      window.ethereum.removeListener("accountsChanged", onAccountChanged);
    };
  }, [onAccountChanged]);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <CssVarsProvider theme={theme}>
        <GlobalRouter />
      </CssVarsProvider>
    </div>
  );
};

export default App;
