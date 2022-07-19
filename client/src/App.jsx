import React, {useCallback, useEffect, useState} from "react";
import SolidityDriveContract from "./contracts/SolidityDrive.json";
import getWeb3 from "./utils/getWeb3";
import {StyledDropZone} from 'react-drop-zone';
import {Table} from 'reactstrap';
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import {defaultStyles, FileIcon} from 'react-file-icon';
import ipfs from "./utils/ipfs";
import Moment from "react-moment";

import "./App.css";

const App = () => {
  const [solidityDrive, setSolidityDrive] = useState([]);
  const [web3, setWeb3] = useState(null);

  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  const getFiles = useCallback(async () => {
    try {

      const filesLength = await contract.methods
        .getLength()
        .call({from: accounts[0]});

      let files = [];
      for (let i = 0; i < filesLength; i++) {
        let file = await contract.methods.getFile(i).call({from: accounts[0]});
        files.push(file);
      }
      setSolidityDrive(files);
    } catch (error) {
      console.log(error);
    }
  }, [contract, accounts]);


  const onDrop = useCallback(async (file) => {
    try {

      const result = await ipfs.add(file);
      console.log(result);

      const timestamp = Math.round(+new Date() / 1000);
      const type = file.name.substr(file.name.lastIndexOf(".") + 1);

      const uploaded = await contract.methods.add(result.path, file.name, type, timestamp).send({
        from: accounts[0],
        gas: 3000000
      })

      console.log(uploaded);
      await getFiles();

      // debugger;
    } catch (error) {
      console.log(error);
    }
  }, [getFiles, contract, accounts])


  useEffect(() => {
    (async () => {
      try {

        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SolidityDriveContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SolidityDriveContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);

        // this.setState({web3, accounts, contract: instance}, this.getFiles);
        window.ethereum.on('update', async () => {
          const changedAccounts = await web3.eth.getAccounts();
          // this.setState({accounts: changedAccounts});
          setAccounts(changedAccounts);
          await getFiles();
        });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    })();
  }, [getFiles]);


  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <div className="container pt-3">
        <StyledDropZone onDrop={onDrop}/>
        <Table>
          <thead>
          <tr>
            <th width="7%" scope="row"> Type</th>
            <th className="text-left">File Name</th>
            <th className="text-right">Date</th>
          </tr>

          </thead>
          <tbody>
          {solidityDrive !== [] ? solidityDrive.map((item, key) => (
            <tr>
              <th>
                <FileIcon
                  size={30}
                  extension={item[2]}
                  {...defaultStyles[item[2]]}
                />
              </th>
              <th className="text-left"><a href={"http://localhost:8080/ipfs/" + item[0]}>{item[1]}</a></th>
              <th className="text-right">
                <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
              </th>
            </tr>
          )) : null}
          </tbody>
        </Table>

      </div>
    </div>

  );
}

export default App;
