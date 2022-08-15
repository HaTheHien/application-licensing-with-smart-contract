const ApplicationManager = artifacts.require("./ApplicationManager.sol");

module.exports = async function (deployer) {
  await deployer.deploy(ApplicationManager);
};
