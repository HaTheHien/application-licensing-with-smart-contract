import { useEtherContext } from "context/EtherContext";
import ApplicationManager from "contracts/ApplicationManager.json";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { appManagementReducer, initialAppManagementState } from "stores";
import { ApplicationConverter } from "types";

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
    if (web3) {
      try {
        if (accounts.length !== 0) {
          const addresses = await contract.methods
            .getCreatedApplications(accounts[0])
            .call({ from: accounts[0] });

          // console.log("Application addresses", addresses);
          dispatch({ type: "SET_ALL_APPS_ADDRESSES", payload: addresses });

          // console.log(addresses);
          const apps = [];
          for (const address of addresses) {
            const contractApp = await contract.methods
              .getApplicationFromAddress(address)
              .call({ from: accounts[0] });
            console.log(contractApp);
            apps.push(ApplicationConverter.fromContract(contractApp, web3));
          }

          // console.log(apps);

          dispatch({ type: "SET_ALL_APPS", payload: apps });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const loadContract = useCallback(
    async (web3, accounts) => {
      if (web3) {
        const networkId = await web3.eth.net.getId();
        const networks = Object.values(ApplicationManager.networks);
        const deployedNetwork = networks[networkId ?? 0] || networks[0];
        // console.log(deployedNetwork.address);

        try {
          const contract = new web3.eth.Contract(
            ApplicationManager.abi,
            deployedNetwork && deployedNetwork.address
          );
          if (contract) {
            dispatch({ type: "SET_APP_MANAGER_CONTRACT", payload: contract });
            await loadApplicationData(contract, web3, accounts);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    [loadApplicationData]
  );

  useEffect(() => {
    (async () => {
      const web3 = etherState.web3;
      // console.log("has web3?", web3);
      const accounts = etherState.accounts ?? [];

      await loadContract(web3, accounts);
    })();
  }, [etherState?.accounts, etherState?.web3, loadContract]);

  const createNewApp = useCallback(
    async (data) => {
      const web3 = etherState.web3;
      const accounts = etherState.accounts ?? [];
      // console.log("accounts?", accounts);

      if (web3 && state.appManagerContract && accounts.length !== 0) {
        const response = await state.appManagerContract.methods
          .createApplication(
            data.id,
            data.formattedPrice,
            "",
            data.name,
            web3.utils.toBN(data.dateCreated)
          )
          .send({ from: accounts[0] });

        console.log(response);
        await loadApplicationData(state.appManagerContract, web3, accounts);
      }
    },
    [
      etherState?.accounts,
      etherState?.web3,
      loadApplicationData,
      state.appManagerContract,
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
