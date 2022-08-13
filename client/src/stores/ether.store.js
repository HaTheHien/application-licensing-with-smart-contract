export const initialEtherState = {
  web3: null,
  // balance: null,
  // address: null,
  // signer: null,
  metaMaskEnabled: false,
  // networkId: null,
  accounts: null,
};

export const etherReducer = (state, action) => {
  switch (action.type) {
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
            // balance: null,
            // address: null,
            // signer: null,
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
    // case "SET_WALLET_INFO": {
    //   return {
    //     ...state,
    //     balance: action?.payload?.balance || state.balance,
    //     address: action?.payload?.address || state.address,
    //   };
    // }
    // case "SET_NETWORK_ID": {
    //   return {
    //     ...state,
    //     networkId: action.payload,
    //   };
    // }
    default:
      return state;
  }
};
