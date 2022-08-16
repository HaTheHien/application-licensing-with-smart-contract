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
import { etherReducer, initialEtherState } from "stores";
import getWeb3 from "utils/getWeb3";

const EtherContext = createContext({
  state: initialEtherState,
  dispatch: () => {},
});

export const useEtherContext = () => {
  return useContext(EtherContext);
};

export const EtherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(etherReducer, initialEtherState);

  const onAccountChanged = useCallback(
    async (web3) => {
      // console.log("web3???", web3);
      console.log("onAccountChanged");
      const web3Instance = web3 ?? state?.web3;

      const changedAccounts = await web3Instance?.eth.getAccounts();
      dispatch({ type: "SET_ACCOUNTS", payload: changedAccounts });
      console.log(`New accounts ${changedAccounts}`);
    },
    [state.web3]
  );

  useEffect(() => {
    (async () => {
      try {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3 = await getWeb3();
        console.log("Web3 instance: ", web3);
        dispatch({ type: "SET_PROVIDER", payload: web3 });

        if (!web3) {
          dispatch({ type: "SET_METAMASK_ENABLED", payload: false });
          return;
        }

        const changedAccounts = await web3?.eth.getAccounts();
        dispatch({ type: "SET_ACCOUNTS", payload: changedAccounts });
        console.log(`Account address ${changedAccounts}`);

        dispatch({ type: "SET_METAMASK_ENABLED", payload: true });
      } catch (e) {
        console.log(e);
        dispatch({ type: "SET_METAMASK_ENABLED", payload: false });
      }
    })();
  }, []);

  const loadContract = useCallback(async (web3) => {
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
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (state.web3) {
        await loadContract(state.web3);
      }
    })();
  }, [loadContract, state.web3]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum?.on("accountsChanged", onAccountChanged);
    }
    return () => {
      console.log("remove previous listener");
      window.ethereum?.removeListener("accountsChanged", onAccountChanged);
    };
  }, [onAccountChanged]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <EtherContext.Provider value={contextValue}>
      {children}
    </EtherContext.Provider>
  );
};

EtherContextProvider.propTypes = {
  children: PropTypes.element,
};
