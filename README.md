# Blockchain Based IPFS Experiment

This repository consists a smart contract code for storing the information from the IPFS ( InterPlanterary File System) to the  Ethereum based Permissioned Blockchain using smart contracts and transaction manager ( Meta-Mask).

## Work Flow
The experiment is carried out using the ReactJs (A open-source JavaScript library for building user interfaces ) for building the front end where the actors can use the portal for sharing the license based information with the licensing organization. Once shared by the actor , the front-end is connected to a IPFS where it records the details of the each file and generates an hash key value which later using the smart contracts and transaction manager the information is stored and recorded on the permissioned blockchain.


# Components
1. Permission Blockchain : We use the truffle framework for the setup of ethereum based permissioned blockchain. ( Reference: [Sweet Tools for Smart Contracts | Truffle Suite](https://www.trufflesuite.com/)
2. Smart Contract :  The smart contract is a piece of code that is written in solidity (Programming Language) which helps connect to the permissioned blockchain, IPFS and transaction Manager for the storing of information. 
3. Transaction Manager (Meta-Mask) : The transaction manager is an application that uses Remote Procedure Call (RPC) protocol to execute the smart contract and store the details to the permission blockchain. Here we use meta-mask ( Reference : [MetaMask - A crypto wallet & gateway to blockchain apps](https://metamask.io/) as out transaction manager.
4. IPFS : The Interplanetary File system - Reference: [IPFS Powers the Distributed Web](https://ipfs.io/) is here configured to generate a hash key value which contains information and which is later used to store the information on the permissioned blockchain.

## Execution of the project

1. Clone the repository by using git clone. Before cloning ensure that you have NPM and nodeJS setup on your machine. For installation of these software please refer [How to Install Node.js and NPM on Your Windows System (phoenixnap.com)](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
2. Then install the requirement software programs and libraries like Truffle Suite - Ganache , Transaction Manager ( Meta-mask) , IPFS.
3. Once the software are installed then, use the code npm install to get all the required libraries to run the code.
4. Once the libraries are installed, use npm start - to run the code.
5. The system will  allot a localhost based http url. Clicking on it will render you to the execution of app.js. 
6. Then you could fill the required information of your licence, where the file contents are stored in IPFS. 
7. Once the files are stored in the IPFS, it generates a hash key which is then connected to  transaction manager which execute using smart contracts and stored in the permissioned blockchain.
