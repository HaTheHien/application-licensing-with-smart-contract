import { useEtherContext } from "context/EtherContext";
import ApplicationManager from "contracts/ApplicationManager.json";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
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

  const createNewApp = useCallback(
    async (data) => {
      const web3 = etherState.web3;
      console.log("has web3?", web3);
      const accounts = etherState.accounts ?? [];
      console.log("accounts?", accounts);

      if (web3 && accounts.length !== 0) {
        const networkId = await web3.eth.net.getId();
        const networks = Object.values(ApplicationManager.networks);
        const deployedNetwork = networks[networkId ?? 0] || networks[0];
        console.log(deployedNetwork.address);

        const contract = new web3.eth.Contract(
          ApplicationManager.abi,
          deployedNetwork && deployedNetwork.address
        );
        // console.log(contract.address);

        const response = await contract.methods
          .createApplication(
            data.id,
            data.formattedPrice,
            "",
            data.name,
            web3.utils.toBN(data.dateCreated)
          )
          .send({ from: accounts[0] });

        console.log(response);

        // const app2 = await contract.getApplication(ethers.BigNumber.from(14), {
        //   gasLimit: 500_000,
        //   from: address,
        // });
        // console.log(app2);

        const n = await contract.methods.getNumberOfApplications().call({
          from: accounts[0],
        });
        console.log(n);
      }
    },
    [etherState.web3, etherState.accounts]
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
