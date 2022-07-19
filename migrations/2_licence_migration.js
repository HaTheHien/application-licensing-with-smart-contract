const Licence=artifacts.require("LicenseToken");
module.exports= function (deployer){
    deployer.deploy(Licence);
}