const ApplicationManager = artifacts.require("./ApplicationManager.sol");
const Application2 = artifacts.require("./Application2.sol");

const app1 = {
  id: web3.utils.toBN(web3.utils.soliditySha3("com.example.application1")),
  price: web3.utils.toWei("0.5", "ether"),
  contentHash: "",
  name: "Gallery one",
  timestamp: web3.utils.toBN("1660299317772"),
};

async function setupNewApp(accounts) {
  const appManagerInstance = await ApplicationManager.new();

  await appManagerInstance.createApplication(...Object.values(app1), {
    from: accounts[0],
  });

  return appManagerInstance;
}

contract("Application2", (accounts) => {
  it("...should create new license", async () => {
    const appManagerInstance = await setupNewApp(accounts);

    // Get initial balances of first and second account.
    const accountOneStartingBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[0])
    );

    const accountTwoStartingBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[0])
    );

    // console.log(accountTwoStartingBalance);

    const appAddress = await appManagerInstance.getCreatedApplications(
      accounts[0],
      {
        from: accounts[0],
      }
    );

    // console.log(appAddress);

    const appContract = await Application2.at(appAddress[0]);

    await appContract.send(web3.utils.toWei("0.5", "ether"), {
      from: accounts[1],
    });
    // console.log(result);

    const licenses = await appContract.getAllLicenses();
    // console.log(licenses);

    const accountOneEndBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[0])
    );
    const accountTwoEndBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[1])
    );

    assert.equal(licenses.length, 1, "The length of license list should me 1");
    assert.equal(
      accountTwoStartingBalance.gt(accountTwoEndBalance),
      1,
      "Balance from the account that bought the license is not deceased"
    );
    assert.equal(
      accountOneEndBalance.sub(accountOneStartingBalance),
      web3.utils.toWei("0.5", "ether"),
      "Balance from the account that owns the app is not increasing after an account purchased license of the app"
    );

    const licenseListOfAccount0 = await appManagerInstance.getAllLicensesOf(
      accounts[0]
    );
    const licenseListOfAccount1 = await appManagerInstance.getAllLicensesOf(
      accounts[1]
    );

    console.log(licenseListOfAccount0);
    console.log(licenseListOfAccount1);

    assert.equal(
      licenseListOfAccount0.length,
      0,
      "The length of license list of account 0 should me 0"
    );
    assert.equal(
      licenseListOfAccount1.length,
      1,
      "The length of license list of account 1 should me 1"
    );
  });

  it("...should not create new license when coin amount is not enough", async () => {
    try {
      const appManagerInstance = await setupNewApp(accounts);

      const appAddress = await appManagerInstance.getCreatedApplications(
        accounts[0],
        {
          from: accounts[0],
        }
      );

      const appContract = await Application2.at(appAddress[0]);

      await appContract.send(web3.utils.toWei("0.05", "ether"), {
        from: accounts[1],
      });

      assert.fail("The transaction should have thrown an error");
    } catch (e) {
      assert.include(
        e.message.toLowerCase(),
        "revert",
        "The error message should contain 'revert'"
      );
    }
  });
});
