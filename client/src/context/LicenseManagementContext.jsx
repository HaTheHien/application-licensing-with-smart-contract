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
import { LicenseContractService } from "services";
import {
  initialLicenseManagementState,
  licenseManagementReducer,
} from "stores";

const LicenseManagementContext = createContext({
  state: initialLicenseManagementState,
  dispatch: () => {},
});

export const useLicenseManagementContext = () => {
  return useContext(LicenseManagementContext);
};

const LicenseManagementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    licenseManagementReducer,
    initialLicenseManagementState
  );

  const { state: etherState } = useEtherContext();

  const loadLicenseData = useCallback(async (contract, web3, accounts) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    const data = await LicenseContractService.loadLicenseData(
      contract,
      web3,
      accounts
    );
    console.log(data);
    dispatch({ type: "SET_LICENSE_DATA_FROM_CONTRACT", payload: data });
    dispatch({ type: "SET_IS_LOADING", payload: false });
  }, []);

  useEffect(() => {
    (async () => {
      const contract = etherState.appManagerContract;

      const web3 = etherState.web3;
      // console.log("has web3?", web3);
      const accounts = etherState.accounts ?? [];

      await loadLicenseData(contract, web3, accounts);
    })();
  }, [
    etherState.accounts,
    etherState.web3,
    etherState.appManagerContract,
    loadLicenseData,
  ]);

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      loadLicenseData,
    };
  }, [loadLicenseData, state]);

  return (
    <LicenseManagementContext.Provider value={contextValue}>
      {children}
    </LicenseManagementContext.Provider>
  );
};

LicenseManagementContextProvider.propTypes = {
  children: PropTypes.element,
};

export default LicenseManagementContextProvider;
