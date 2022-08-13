import { ethers } from "ethers";
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

const EtherContext = createContext({
  state: initialEtherState,
  dispatch: () => {},
});

export const useEtherContext = () => {
  return useContext(EtherContext);
};

export const EtherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(etherReducer, initialEtherState);

  // console.log(state);

  const getWalletInfo = useCallback(async (signer) => {
    if (!signer) return;

    const balance = ethers.utils.formatEther(await signer.getBalance());
    const address = await signer.getAddress();

    dispatch({ type: "SET_WALLET_INFO", payload: { balance, address } });
  }, []);

  const loadMetamask = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      dispatch({ type: "SET_PROVIDER", payload: provider });

      if (!provider) {
        dispatch({ type: "SET_METAMASK_ENABLED", payload: false });
        return;
      }

      const signer = await provider.getSigner();
      dispatch({ type: "SET_SIGNER", payload: signer });
      await getWalletInfo(signer);

      const networkId = (await provider.getNetwork()).name;
      dispatch({ type: "SET_NETWORK_ID", payload: networkId });

      dispatch({ type: "SET_METAMASK_ENABLED", payload: true });
    } catch (e) {
      console.log(e);
      dispatch({ type: "SET_METAMASK_ENABLED", payload: false });
    }
  }, [getWalletInfo]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      getWalletInfo,
      loadMetamask,
    }),
    [state, getWalletInfo, loadMetamask]
  );

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => loadMetamask())
      .catch((err) => {
        if (err.code === 4001) {
          console.log("not connected to metamask");
        } else {
          console.log(err);
        }
      });

    const cb = () => loadMetamask();
    window.ethereum.on("chainChanged", cb);
    window.ethereum.on("accountsChanged", cb);

    return () => {
      window.ethereum.removeListener("chainChanged", cb);
      window.ethereum.removeListener("accountsChanged", cb);
    };
  }, [loadMetamask]);

  return (
    <EtherContext.Provider value={contextValue}>
      {children}
    </EtherContext.Provider>
  );
};

EtherContextProvider.propTypes = {
  children: PropTypes.element,
};
