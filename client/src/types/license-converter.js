function fromContract(license, web3) {
  return {
    id: web3.utils.numberToHex(license["0"]),
    dateCreated: +license["1"],
    dateExpired: +license["2"],
  };
}

export const LicenseConverter = {
  fromContract,
};
