import { ApplicationConverter } from "types";

async function loadApplicationDataFromAddress(
  contract,
  web3,
  account,
  applicationContractAddress
) {
  const contractApp = await contract.methods
    .getApplicationFromAddress(applicationContractAddress)
    .call({ from: account });
  // console.log(contractApp);
  return ApplicationConverter.fromContract(contractApp, web3);
}

async function loadPublishedApplicationData(contract, web3, accounts) {
  if (!contract || !web3 || (accounts ?? []).length === 0) return {};

  try {
    const addresses = await contract.methods
      .getCreatedApplications(accounts[0])
      .call({ from: accounts[0] });

    const apps = [];
    for (const address of addresses) {
      apps.push(
        await loadApplicationDataFromAddress(
          contract,
          web3,
          accounts[0],
          address
        )
      );
    }

    return {
      allPublishedAppAddresses: addresses,
      allPublishedApps: apps,
    };
  } catch (e) {
    console.log(e);
  }
  return {};
}

async function loadAllApplicationData(contract, web3, accounts) {
  if (!contract || !web3 || (accounts ?? []).length === 0) return {};

  try {
    const addresses = await contract.methods
      .getAllApplications()
      .call({ from: accounts[0] });

    const apps = [];
    for (const address of addresses) {
      apps.push(
        await loadApplicationDataFromAddress(
          contract,
          web3,
          accounts[0],
          address
        )
      );
    }

    return {
      allAppAddresses: addresses,
      allApps: apps,
    };
  } catch (e) {
    console.log(e);
  }
  return {};
}

async function loadApplicationData(contract, web3, accounts) {
  return {
    ...(await loadPublishedApplicationData(contract, web3, accounts)),
    ...(await loadAllApplicationData(contract, web3, accounts)),
  };
}

async function createNewApp(contract, data, accounts, web3) {
  return await contract.methods
    .createApplication(...ApplicationConverter.toContract(data, web3))
    .send({ from: accounts[0] });
}

async function purchaseLicense(contract, appAddress, price, accounts, web3) {
  return web3.eth.sendTransaction({
    from: accounts[0],
    to: appAddress,
    value: price,
  });
}

export const ApplicationContractService = {
  // loadApplicationDataFromAddress,
  loadApplicationData,
  loadPublishedApplicationData,
  createNewApp,
  purchaseLicense,
};
