const ApplicationManager = artifacts.require("./ApplicationManager.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ApplicationManager);

  const appManagerInstance = await ApplicationManager.deployed();
  console.log("deploying apps, licenses...");
  await deployApplication(accounts, appManagerInstance);
};

const app1 = {
  id: web3.utils.toBN(web3.utils.soliditySha3("com.example.gallery_one")),
  price: web3.utils.toWei("0.5", "ether"),
  contentHash: "",
  name: "Gallery one",
  timestamp: web3.utils.toBN("1660299317772"),
};

const app2 = {
  id: web3.utils.toBN(web3.utils.soliditySha3("com.example.gallery_two")),
  price: web3.utils.toWei("0.15", "ether"),
  contentHash: "",
  name: "Gallery two",
  timestamp: web3.utils.toBN("1660299317773"),
};

async function deployApplication(accounts, appManagerInstance) {
  await appManagerInstance.createApplication(...Object.values(app1), {
    from: accounts[0],
  });

  await appManagerInstance.createApplication(...Object.values(app2), {
    from: accounts[1],
  });
}
