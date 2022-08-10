const License = artifacts.require("./License.sol");
const Application = artifacts.require("./Application.sol");

module.exports = async function (deployer) {
  // await deployer.deploy(SolidityDrive);
  await deployer.deploy(License);
  await deployer.deploy(Application);
};
