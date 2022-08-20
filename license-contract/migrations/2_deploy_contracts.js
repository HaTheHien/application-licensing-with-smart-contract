const ApplicationManager = artifacts.require("./ApplicationManager.sol");
const fs = require("fs");
const path = require("path");

/**
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

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

async function deployApplication(accounts, appManagerInstance) {
  await appManagerInstance.createApplication(...Object.values(app1), {
    from: accounts[0],
  });

  await appManagerInstance.createApplication(...Object.values(app2), {
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

  console.log(info1.id.toString());
  console.log(info2.id.toString());

  const contractDir = path.join(__dirname, "../../client/src/contracts/");
  const sampleAppContractDir = path.join(
    __dirname,
    "../../sample_app/src/contracts/"
  );
  const sampleApp2ContractDir = path.join(
    __dirname,
    "../../another_sample_app/src/contracts/"
  );
  console.log(`Copy contracts to ${sampleAppContractDir}`);
  copyRecursiveSync(contractDir, sampleAppContractDir);
  console.log(`Copy contracts to ${sampleApp2ContractDir}`);
  copyRecursiveSync(contractDir, sampleApp2ContractDir);
}
