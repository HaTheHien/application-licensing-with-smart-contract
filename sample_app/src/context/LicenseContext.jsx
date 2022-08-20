import { createContext, useContext } from "react";

const LicenseContext = createContext({
  havePremiumLicense: false,
});

export const useLicenseContext = () => {
  return useContext(LicenseContext);
};

export const LicenseContextProvider = ({ value, children }) => {
  return (
    <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
  );
};
