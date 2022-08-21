const fs = require("fs-extra");
const fsExtra = require("fs-extra");
const path = require("path");

/**
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copyRecursiveSync = function (src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
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
    fsExtra.copySync(src, dest, { overwrite: true });
  }
};

module.exports = async function (deployer, network, accounts) {
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
};
