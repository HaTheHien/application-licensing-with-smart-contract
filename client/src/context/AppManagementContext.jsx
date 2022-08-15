import { useEtherContext } from "context/EtherContext";
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

  const createNewApp = useCallback(
    async (data) => {
      const web3 = etherState.web3;
      const accounts = etherState.accounts ?? [];
      // console.log("accounts?", accounts);

      if (web3 && etherState.appManagerContract && accounts.length !== 0) {
        await etherState.appManagerContract.methods
          .createApplication(
            data.id,
            data.formattedPrice,
            "",
            data.name,
            web3.utils.toBN(data.dateCreated)
          )
          .send({ from: accounts[0] });

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

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      createNewApp,
    };
  }, [createNewApp, state]);

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
