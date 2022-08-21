const ApplicationManager = artifacts.require("./ApplicationManager.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ApplicationManager);

  const appManagerInstance = await ApplicationManager.deployed();
  console.log("deploying apps, licenses...");
  await deployApplication(accounts, appManagerInstance);
};

const app1 = {
  id: web3.utils.toBN(web3.utils.soliditySha3("com.example.todo")),
  price: web3.utils.toWei("0.05", "ether"),
  contentHash: "",
  name: "Todo",
  timestamp: web3.utils.toBN("1660299317772"),
};

const app2 = {
  id: web3.utils.toBN(web3.utils.soliditySha3("com.example.calculator")),
  price: web3.utils.toWei("0.15", "ether"),
  contentHash: "",
  name: "Calculator",
  timestamp: web3.utils.toBN("1660299317773"),
};
const app2Premium = {
  id: web3.utils.toBN(
    web3.utils.soliditySha3("com.example.calculator_premium")
  ),
  price: web3.utils.toWei("0.25", "ether"),
  contentHash: "",
  name: "Calculator (Premium)",
  timestamp: web3.utils.toBN("1660299317773"),
};

async function deployApplication(accounts, appManagerInstance) {
  await appManagerInstance.createApplication(...Object.values(app1), {
    from: accounts[0],
  });

  await appManagerInstance.createApplication(...Object.values(app2), {
    from: accounts[1],
  });
  await appManagerInstance.createApplication(...Object.values(app2Premium), {
    from: accounts[1],
  });

  const apps1 = await appManagerInstance.getCreatedApplications(accounts[0], {
    from: accounts[0],
  });
  console.log(apps1);

  const apps2 = await appManagerInstance.getCreatedApplications(accounts[1], {
    from: accounts[1],
  });
  console.log(apps2);

  const info1 = await appManagerInstance.getApplicationFromAddress(apps1[0]);
  const info2 = await appManagerInstance.getApplicationFromAddress(apps2[0]);
  const info2Premium = await appManagerInstance.getApplicationFromAddress(
    apps2[1]
  );

  console.log(info1.id.toString());
  console.log(info2.id.toString());
  console.log(info2Premium.id.toString());
}
