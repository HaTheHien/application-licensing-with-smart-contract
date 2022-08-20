export const initialEtherState = {
  web3: null,
  metaMaskEnabled: false,
  accounts: null,
  appManagerContract: null,
};

export const etherReducer = (state, action) => {
  switch (action.type) {
    case "SET_APP_MANAGER_CONTRACT": {
      return {
        ...state,
        appManagerContract: action?.payload || state.appManagerContract,
      };
    }
    case "SET_PROVIDER": {
      return {
        ...state,
        web3: action?.payload || state.web3,
      };
    }
    case "SET_ACCOUNTS": {
      return {
        ...state,
        accounts: action?.payload,
      };
    }
    case "SET_METAMASK_ENABLED": {
      const enabled = !!action?.payload;
      const newState = !enabled
        ? {
            web3: null,
            metaMaskEnabled: false,
            accounts: null,
          }
        : {};
      return {
        ...state,
        metaMaskEnabled: enabled,
        ...newState,
      };
    }
    default:
      return state;
  }
};
