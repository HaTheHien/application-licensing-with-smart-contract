import Application2 from "contracts/Application2.json";
import ApplicationManager from "contracts/ApplicationManager.json";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import getWeb3 from "utils/getWeb3";

const LicenseContext = createContext({
  havePremiumLicense: false,
  haveLicense: false,
  error: false,
  web3: null,
  accounts: null,
  checkLicense: (_, __) => {},
});

export const useLicenseContext = () => {
  return useContext(LicenseContext);
};

export const LicenseContextProvider = ({ children }) => {
  const [haveLicense, setHaveLicense] = useState(null);
  const [havePremiumLicense, setHavePremiumLicense] = useState(null);
  const [error, setError] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const checkLicense = useCallback(async (web3, accounts) => {
    if (!accounts || accounts?.length === 0) return;
    if (!web3) return;

    const account = accounts[0];
    console.log(account);

    const networkId = await web3?.eth?.net.getId();
    const networks = Object.values(ApplicationManager.networks);
    const deployedNetwork = networks[networkId ?? 0] || networks[0];

    const appManagerInstance = new web3.eth.Contract(
      ApplicationManager.abi,
      deployedNetwork && deployedNetwork.address
    );

    console.log(`Application manager contract address: ${deployedNetwork?.address}`)

    const { appAddress } = await appManagerInstance.methods
      .getApplication(web3.utils.toBN(process.env.REACT_APP_CONTRACT_ID))
      .call({ from: account });

    console.log("App contract address", appAddress);
    const appContract = await new web3.eth.Contract(
      Application2.abi,
      appAddress
    );

    const check = await appContract.methods
      .checkLicense(account)
      .call({ from: account });

    console.log(check);
    setHaveLicense(check);

    try {
      const premiumApp = await appManagerInstance.methods
        .getApplication(
          web3.utils.toBN(process.env.REACT_APP_PREMIUM_APP_CONTRACT_ID)
        )
        .call({ from: account });

      const premiumAppContract = await new web3.eth.Contract(
        Application2.abi,
        premiumApp?.appAddress
      );

      const check = await premiumAppContract.methods
        .checkLicense(account)
        .call({ from: account });

      if (check) {
        setHaveLicense(true);
      }
      setHavePremiumLicense(check);
    } catch (e) {
      // console.log("Cannot load premium license");
      console.log(e);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);
        const accounts = await web3?.eth.getAccounts();
        setAccounts(accounts);

        await checkLicense(web3, accounts);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    })();
  }, [checkLicense]);

  const reset = useCallback(() => {
    setError(false);
    setHaveLicense(false);
    setHavePremiumLicense(false);
  }, []);

  useEffect(() => {
    reset();

    const cb = async (accounts) => {
      setAccounts(accounts);
      reset();
      await checkLicense(web3, accounts);
    };
    if (window.ethereum) {
      window.ethereum?.on("accountsChanged", cb);
    }
    return () => {
      console.log("remove previous listener");
      window.ethereum?.removeListener("accountsChanged", cb);
    };
  }, [checkLicense, reset, web3]);

  const value = useMemo(
    () => ({
      havePremiumLicense,
      haveLicense,
      error,
      checkLicense,
      web3,
      accounts,
    }),
    [accounts, checkLicense, error, haveLicense, havePremiumLicense, web3]
  );

  return (
    <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
  );
};
