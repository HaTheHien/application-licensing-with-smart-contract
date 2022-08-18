const ApplicationManager = artifacts.require("./ApplicationManager.sol");
const Application2 = artifacts.require("./Application2.sol");
const License2 = artifacts.require("./License2.sol");

const app1 = {
  id: web3.utils.toBN(web3.utils.soliditySha3("com.example.application1")),
  price: web3.utils.toWei("0.5", "ether"),
  contentHash: "",
  name: "Gallery one",
  timestamp: web3.utils.toBN("1660299317772"),
};

async function setupNewAppAndLicense(accounts) {
  const appManagerInstance = await ApplicationManager.new();

  await appManagerInstance.createApplication(...Object.values(app1), {
    from: accounts[0],
  });

  const appAddresses = await appManagerInstance.getCreatedApplications(
    accounts[0],
    {
      from: accounts[0],
    }
  );
  const appContract = await Application2.at(appAddresses[0]);
  await appContract.send(web3.utils.toWei("0.5", "ether"), {
    from: accounts[1],
  });

  return { appManagerInstance, appContract };
}

contract("License2", (accounts) => {
  it("...should transfer license by license owner", async () => {
    const { appManagerInstance, appContract } = await setupNewAppAndLicense(
      accounts
    );

    const owner1Licenses = await appManagerInstance.getAllLicensesOf(
      accounts[1]
    );

    console.log(owner1Licenses);

    const licenseContractInstance = await License2.at(owner1Licenses[0]);
    // console.log(licenseContractInstance);
    console.log("transfer from account 1")
    await licenseContractInstance.transferLicense(accounts[2], {
      from: accounts[1],
    });

    const owner1LicensesAfter1stTransfer =
      await appManagerInstance.getAllLicensesOf(accounts[1]);

    const owner2LicensesAfter1stTransfer =
      await appManagerInstance.getAllLicensesOf(accounts[2]);

    assert.equal(
      owner1LicensesAfter1stTransfer.length,
      0,
      "After the first transfer, account 1 should not own the license"
    );
    assert.equal(
      owner2LicensesAfter1stTransfer.length,
      1,
      "After the first transfer, account 2 should own the license"
    );

    console.log("transfer back to account 1");
    const licenseContractInstance2 = await License2.at(owner1Licenses[0]);

    await licenseContractInstance2.transferLicense(accounts[1], {
      from: accounts[2],
    });

    const owner1LicensesAfter2ndTransfer =
      await appManagerInstance.getAllLicensesOf(accounts[1]);

    const owner2LicensesAfter2ndTransfer =
      await appManagerInstance.getAllLicensesOf(accounts[2]);

    assert.equal(
      owner1LicensesAfter2ndTransfer.length,
      1,
      "After the second transfer, account 1 should own the license"
    );
    assert.equal(
      owner2LicensesAfter2ndTransfer.length,
      0,
      "After the second transfer, account 2 should not own the license"
    );
  });
});
