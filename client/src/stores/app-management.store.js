export const initialAppManagementState = {
  allAppAddresses: [],
  isLoading: false,
  appManagerContract: null,
};

export const appManagementReducer = (state, action) => {
  switch (action.type) {
    case "SET_APP_MANAGER_CONTRACT": {
      return {
        ...state,
        appManagerContract: action?.payload || state.appManagerContract,
      };
    }
    case "SET_ALL_APPS_ADDRESSES": {
      return {
        ...state,
        allAppAddresses: action?.payload || state.allAppAddresses,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action?.payload || state.isLoading,
      };
    }
    default:
      return state;
  }
};
