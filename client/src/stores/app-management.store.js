export const initialAppManagementState = {
  allApps: [],
  isLoading: false,
};

export const appManagementReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_APPS": {
      return {
        ...state,
        allApps: action?.payload || state.allApps,
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
