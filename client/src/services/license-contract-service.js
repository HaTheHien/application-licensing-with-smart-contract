import { License2 } from "contracts";
import { LicenseConverter } from "types";

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
    console.error(e);
  }
  return {};
}

export async function transferLicense(
  licenseAddress,
  newOwnerAddress,
  web3,
  accounts
) {
  if (
    !licenseAddress ||
    !newOwnerAddress ||
    !web3 ||
    (accounts ?? []).length === 0
  ) {
    return false;
  }

  try {
    const licenseContract = new web3.eth.Contract(License2.abi, licenseAddress);

    await licenseContract.methods
      .transferLicense(newOwnerAddress)
      .send({ from: accounts[0] });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const LicenseContractService = {
  loadLicenseData,
  transferLicense,
};
