import Main from "components/Main";
import Application2 from "contracts/Application2.json";
import ApplicationManager from "contracts/ApplicationManager.json";
import React, { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import getWeb3 from "utils/getWeb3";

const APP_CONTRACT_ID =
  "81180384624698422361266057088145727569009936601858239732761166602376299871175";

export default function Licence() {
  const [haveLicense, setHaveLicense] = useState(null);
  const [error, setError] = useState(false);

  const checkLicense = useCallback(async (web3, account) => {
    const networkId = await web3.eth.net.getId();
    const networks = Object.values(ApplicationManager.networks);
    const deployedNetwork = networks[networkId ?? 0] || networks[0];

    const appManagerInstance = new web3.eth.Contract(
      ApplicationManager.abi,
      deployedNetwork && deployedNetwork.address
    );

    const { appAddress } = await appManagerInstance.methods
      .getApplication(web3.utils.toBN(APP_CONTRACT_ID))
      .call({ from: account });
    console.log(appAddress);
    const appContract = await new web3.eth.Contract(
      Application2.abi,
      appAddress
    );

    var check = await appContract.methods
      .checkLicense(account)
      .call({ from: account });

    setHaveLicense(check);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3?.eth.getAccounts();
        await checkLicense(web3, accounts[0]);
        window.ethereum.on("accountsChanged", async (accounts) => {
          await checkLicense(web3, accounts[0]);
        });
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    load();
  }, [checkLicense]);

  return (
    <div className="licence">
      <div className="licence-notif">
        {error === true ? (
          <div>Can't find application contract.</div>
        ) : haveLicense == null ? (
          <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        ) : haveLicense ? (
          <Main />
        ) : (
          <div>You don't have license.</div>
        )}
      </div>
    </div>
  );
}
