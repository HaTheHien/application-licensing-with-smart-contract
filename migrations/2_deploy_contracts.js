var SolidityDrive = artifacts.require("./SolidityDrive.sol");
var License = artifacts.require("./License.sol");

module.exports = function(deployer) {
  deployer.deploy(SolidityDrive);
  deployer.deploy(License);
};
