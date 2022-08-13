export const initialEtherState = {
  ether: null,
  balance: null,
  address: null,
  signer: null,
  metaMaskEnabled: false,
  networkId: null,
};

export const etherReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROVIDER": {
      return {
        ...state,
        ether: action?.payload || state.ether,
      };
    }
    case "SET_SIGNER": {
      return {
        ...state,
        signer: action?.payload || state.signer,
      };
    }
    case "SET_METAMASK_ENABLED": {
      const enabled = !!action?.payload;
      const newState = !enabled
        ? {
            ether: null,
            balance: null,
            address: null,
            signer: null,
            metaMaskEnabled: false,
          }
        : {};
      return {
        ...state,
        metaMaskEnabled: enabled,
        ...newState,
      };
    }
    case "SET_WALLET_INFO": {
      return {
        ...state,
        balance: action?.payload?.balance || state.balance,
        address: action?.payload?.address || state.address,
      };
    }
    case "SET_NETWORK_ID": {
      return {
        ...state,
        networkId: action.payload,
      };
    }
    default:
      return state;
  }
};
