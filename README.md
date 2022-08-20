# ĐỒ ÁN CUỐI KÌ MÔN CÁC CÔNG NGHỆ MỚI TRONG PHÁT TRIỂN PHẦN MỀM

## Đề tài: BLOCKCHAIN SOFTWARE LICENCE MANAGEMENT

Thông tin nhóm:
1. Đỗ Quốc Huy
2. Hà Thế Hiển
3. Nguyễn Đỗ Khiêm



#### Framework
      Client: ReactJS
      Blockchain: Ethereum Smart Contract (Solidity, Truffle)
      Supporting tools: Ganache, Metamask, IPFS      



### Setup Blockchain - IPFS
    1. Install Truffle
    2. Install Ganache
    3. Install IPFS
    
    

#### Setup Ganache
1. Create new workspace --> Name for new workspace
2. Add project (application-licensing-with-smart-contract\license-contract\truffle-config.js)
3. Go to Chain tab -> Set gas limit to 672197500
4. Save workspace


      
#### Setup IPFS
1. Install IPFS by following the instructions from this link: https://docs.ipfs.tech/install/
2. Set the Access-Control-Allow-Origin header and other headers using `ipfs config`
      ```
      ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
      ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
      ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
      ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
      ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
      ```
 3. Run IPFS
      ```
      ipfs daemon
      ```
      
     
     
#### Setup Metamask
1. Install Metamask from the link: https://metamask.io/download/
2. Setup network in Metamask (Go to Settings --> Networks --> Add network)
      ```
      i. Fill Network name (e.g Private Network)
      ii. Fill RPC URL: HTTP://127.0.0.1:7545
      iii. Fill chain ID: 1337
      iv. Fill currency symbol: ETH
      v. Click Add
      ```
3. Import Account(s) from Ganache to Metamask for testing



#### Deploy truffle
1. Go to contract: cd ./license-contract
2. Truffle deploy

      

#### How to run client
      1. Go to client: cd ./client
      2. Install packages: yarn install
      3. Run app: yarn start
      
