export const initialAppManagementState = {
  isLoading: false,
  allPublishedAppAddresses: [],
  allAppAddresses: [],
  allPublishedApps: [],
  allApps: [],
};

export const appManagementReducer = (state, action) => {
  switch (action.type) {
    case "SET_APP_DATA_FROM_CONTRACT": {
      return {
        ...state,
        allPublishedAppAddresses:
          action?.payload?.allPublishedAppAddresses ||
          state.allPublishedAppAddresses,
        allAppAddresses:
          action?.payload?.allAppAddresses || state.allAppAddresses,
        allPublishedApps:
          action?.payload?.allPublishedApps || state.allPublishedApps,
        allApps: action?.payload?.allApps || state.allApps,
      };
    }
    case "SET_ALL_PUBLISHED_APP_ADDRESSES": {
      return {
        ...state,
        allPublishedAppAddresses:
          action?.payload || state.allPublishedAppAddresses,
      };
    }
    case "SET_ALL_APP_ADDRESSES": {
      return {
        ...state,
        allAppAddresses: action?.payload || state.allAppAddresses,
      };
    }
    case "SET_ALL_PUBLISHED_APPS": {
      return {
        ...state,
        allPublishedApps: action?.payload || state.allPublishedApps,
      };
    }
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
