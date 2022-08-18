import { LicenseConverter } from "types";
import License2 from "contracts/License2.json";

async function loadLicenseDataFromAddress(
  contract,
  web3,
  account,
  licenseContractAddress
) {
  const licenseContract = await new web3.eth.Contract(
    License2.abi,
    licenseContractAddress
  ).methods
    .getLicense()
    .call({ from: account });

  return LicenseConverter.fromContract(licenseContract, web3);
}

async function loadLicenseData(contract, web3, accounts) {
  if (!contract || !web3 || (accounts ?? []).length === 0) return {};

  try {
    const addresses = await contract.methods
      .getAllLicensesOf(accounts[0])
      .call({ from: accounts[0] });

    const licenses = [];
    for (const address of addresses) {
      licenses.push(
        await loadLicenseDataFromAddress(contract, web3, accounts[0], address)
      );
    }

    return {
      licenseAddresses: addresses,
      licenses,
    };
  } catch (e) {
    console.log(e);
  }
  return {};
}

export const LicenseContractService = {
  loadLicenseData,
};