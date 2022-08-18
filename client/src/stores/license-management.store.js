export const initialLicenseManagementState = {
  licenseAddresses: [],
  isLoading: false,
  licenses: [],
  isTransactionProcessing: false,
  isTransactionFailed: false,
  isTransactionStatusDialogOpened: false,
};

export const licenseManagementReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_LICENSES_ADDRESSES": {
      return {
        ...state,
        licenseAddresses: action?.payload || state.licenseAddresses,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: !!action?.payload,
      };
    }
    case "SET_IS_TRANSACTION_PROCESSING": {
      return {
        ...state,
        isTransactionProcessing: !!action?.payload,
      };
    }
    case "SET_IS_TRANSACTION_FAILED": {
      return {
        ...state,
        isTransactionFailed: !!action?.payload,
        isTransactionStatusDialogOpened: true,
      };
    }
    case "SET_IS_TRANSACTION_STATUS_DIALOG_OPENED": {
      return {
        ...state,
        isTransactionStatusDialogOpened: !!action?.payload,
      };
    }
    case "SET_ALL_LICENSES": {
      return {
        ...state,
        licenses: action?.payload || state.licenses,
      };
    }
    case "SET_LICENSE_DATA_FROM_CONTRACT": {
      return {
        ...state,
        licenseAddresses:
          action?.payload?.licenseAddresses || state.licenseAddresses,
        licenses: action?.payload?.licenses || state.licenses,
      };
    }
  }
};
