// const License = artifacts.require("./License.sol");
// const Application = artifacts.require("./Application.sol");

// const License2 = artifacts.require("./License2.sol");
// const Application2 = artifacts.require("./Application2.sol");
const ApplicationManager = artifacts.require("./ApplicationManager.sol");

module.exports = async function (deployer) {
  // await deployer.deploy(SolidityDrive);
  // await deployer.deploy(License);
  // await deployer.deploy(Application);

  await deployer.deploy(ApplicationManager);
};
