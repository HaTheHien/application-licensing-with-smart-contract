var SolidityDrive = artifacts.require("./SolidityDrive.sol");
var License = artifacts.require("./License.sol");
var Application = artifacts.require("./Application.sol");

module.exports = function(deployer) {
  deployer.deploy(SolidityDrive);
  deployer.deploy(License);
  deployer.deploy(Application);
};
