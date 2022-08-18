function fromContract(license, web3) {
  return {
    appId: web3.utils.numberToHex(license["0"]),
    dateCreated: +license["1"],
    dateExpired: +license["2"],
  };
}

export const LicenseConverter = {
  fromContract,
};
