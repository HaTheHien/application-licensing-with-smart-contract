import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { etherReducer, initialEtherState } from "stores";
import { ethers } from "ethers";

const EtherContext = createContext({
  state: initialEtherState,
  dispatch() {},
});

export const useEtherContext = () => {
  return useState(EtherContext);
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

      const signer = await provider.getSigner();
      dispatch({ type: "SET_SIGNER", payload: signer });
      await getWalletInfo(signer);

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
