import { useEtherContext } from "context/EtherContext";
import { ethers } from "ethers";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { appManagementReducer, initialAppManagementState } from "stores";
import ApplicationManager from "contracts/ApplicationManager.json";

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
      console.log(etherState.signer);
      if (etherState.signer || etherState.networkId) {
        const networks = Object.values(ApplicationManager.networks);
        const deployedNetwork =
          networks[etherState.networkId ?? 0] || networks[0];
        console.log(deployedNetwork);
        const contract = new ethers.Contract(
          deployedNetwork.address,
          ApplicationManager.abi,
          etherState.signer
        );
        console.log(contract.address);

        const address = await etherState.signer.getAddress();
        const response = await contract.createApplication(
          ethers.BigNumber.from(data.id),
          data.formattedPrice,
          "",
          data.name,
          ethers.BigNumber.from(data.dateCreated),
          { gasLimit: 500_000, from: address }
        );
        console.log(response);

        // const app2 = await contract.getApplication(ethers.BigNumber.from(14), {
        //   gasLimit: 500_000,
        //   from: address,
        // });
        // console.log(app2);

        // const n = await contract.getNumberOfApplications({ gasLimit: 500_000 });
        // console.log(n);
      }
    },
    [etherState.signer, etherState.networkId]
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
