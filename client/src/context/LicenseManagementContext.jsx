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

  const transferLicense = useCallback(
    async (licenseAddress, newOwnerAddress) => {
      const web3 = etherState.web3;
      // console.log("has web3?", web3);
      const accounts = etherState.accounts ?? [];

      if (web3 && licenseAddress && newOwnerAddress) {
        dispatch({ type: "SET_IS_TRANSACTION_PROCESSING", payload: true });
        const result = await LicenseContractService.transferLicense(
          licenseAddress,
          newOwnerAddress,
          web3,
          accounts
        );
        dispatch({ type: "SET_IS_TRANSACTION_PROCESSING", payload: false });

        if (!result) {
          dispatch({ type: "SET_IS_TRANSACTION_FAILED", payload: true });
        } else {
          const contract = etherState.appManagerContract;
          await loadLicenseData(contract, web3, accounts);
        }

        dispatch({
          type: "SET_IS_TRANSACTION_STATUS_DIALOG_OPENED",
          payload: true,
        });
      } else {
        console.log(
          `Something is null: web3 ? ${!web3}, licenseAddress? ${!licenseAddress}, newOwnerAddress? ${newOwnerAddress}`
        );
      }
    },
    [
      etherState.accounts,
      etherState.appManagerContract,
      etherState.web3,
      loadLicenseData,
    ]
  );

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
      transferLicense,
    };
  }, [loadLicenseData, state, transferLicense]);

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
