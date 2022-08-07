export const initialEtherState = {
  ether: null,
  balance: null,
  address: null,
  signer: null,
  metaMaskEnabled: false,
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
      return {
        ...state,
        metaMaskEnabled: !!action?.payload,
      };
    }
    case "SET_WALLET_INFO": {
      return {
        ...state,
        balance: action?.payload?.balance || state.balance,
        address: action?.payload?.address || state.address,
      };
    }
    default:
      return state;
  }
};
