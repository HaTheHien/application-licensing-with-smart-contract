import { useEtherContext } from "context/EtherContext";
import { useLicenseManagementContext } from "context/LicenseManagementContext";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ApplicationContractService } from "services";
import { appManagementReducer, initialAppManagementState } from "stores";

const AppManagementContext = createContext({
  state: initialAppManagementState,
  dispatch: () => {},
});

export const useAppManagementContext = () => {
  return useContext(AppManagementContext);
};

const AppManagementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    appManagementReducer,
    initialAppManagementState
  );

  const { state: etherState } = useEtherContext();
  const { loadLicenseData, dispatch: licenseDispatch } =
    useLicenseManagementContext();

  const loadApplicationData = useCallback(async (contract, web3, accounts) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    const data = await ApplicationContractService.loadApplicationData(
      contract,
      web3,
      accounts
    );
    console.log(data);
    dispatch({ type: "SET_APP_DATA_FROM_CONTRACT", payload: data });
    dispatch({ type: "SET_IS_LOADING", payload: false });
  }, []);

  const loadPublishedApplicationData = useCallback(
    async (contract, web3, accounts) => {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const data =
        await ApplicationContractService.loadPublishedApplicationData(
          contract,
          web3,
          accounts
        );
      console.log(data);
      dispatch({ type: "SET_APP_DATA_FROM_CONTRACT", payload: data });
      dispatch({ type: "SET_IS_LOADING", payload: false });
    },
    []
  );

  const createNewApp = useCallback(
    async (data) => {
      const web3 = etherState.web3;
      const accounts = etherState.accounts ?? [];
      // console.log("accounts?", accounts);

      if (web3 && etherState.appManagerContract && accounts.length !== 0) {
        await ApplicationContractService.createNewApp(
          etherState.appManagerContract,
          data,
          accounts,
          web3
        );

        // console.log(response);
        await loadPublishedApplicationData(
          etherState.appManagerContract,
          web3,
          accounts
        );
      }
    },
    [
      etherState.web3,
      etherState.accounts,
      etherState.appManagerContract,
      loadPublishedApplicationData,
    ]
  );

  const purchaseLicense = useCallback(
    async (app) => {
      const web3 = etherState.web3;
      const accounts = etherState.accounts ?? [];
      if (
        web3 &&
        etherState.appManagerContract &&
        accounts.length !== 0 &&
        app
      ) {
        if (app.owner === accounts[0]) return;
        const index = state.allApps.findIndex((a) => a.id === app.id);
        if (index === -1) return;

        try {
          licenseDispatch({ type: "SET_IS_PURCHASE_LOADING", payload: true });
          await ApplicationContractService.purchaseLicense(
            etherState.appManagerContract,
            state.allAppAddresses[index],
            app.price,
            accounts,
            web3
          );

          await loadLicenseData(etherState.appManagerContract, web3, accounts);
          licenseDispatch({ type: "SET_IS_PURCHASE_LOADING", payload: false });
          licenseDispatch({
            type: "SET_IS_PURCHASE_DIALOG_OPENED",
            payload: true,
          });
        } catch (e) {
          licenseDispatch({ type: "SET_IS_PURCHASE_LOADING", payload: false });
          licenseDispatch({ type: "SET_IS_PURCHASE_FAILED", payload: true });
          console.log(e);
        }
      }
    },
    [
      etherState.accounts,
      etherState.appManagerContract,
      etherState.web3,
      licenseDispatch,
      loadLicenseData,
      state.allAppAddresses,
      state.allApps,
    ]
  );

  useEffect(() => {
    (async () => {
      const contract = etherState.appManagerContract;

      const web3 = etherState.web3;
      // console.log("has web3?", web3);
      const accounts = etherState.accounts ?? [];

      await loadApplicationData(contract, web3, accounts);
    })();
  }, [
    etherState.accounts,
    etherState.web3,
    etherState.appManagerContract,
    loadApplicationData,
  ]);

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      createNewApp,
      purchaseLicense,
    };
  }, [createNewApp, purchaseLicense, state]);

  return (
    <AppManagementContext.Provider value={contextValue}>
      {children}
    </AppManagementContext.Provider>
  );
};

AppManagementContextProvider.propTypes = {
  children: PropTypes.element,
};

export default AppManagementContextProvider;
