const ApplicationManager = artifacts.require("./ApplicationManager.sol");

contract("ApplicationManager", (accounts) => {
  it("...should create new app", async () => {
    const appManagerInstance = await ApplicationManager.new();

    const id = web3.utils.toBN(
      web3.utils.soliditySha3("com.example.application")
    );
    const price = web3.utils.toWei("0.5", "ether");
    const contentHash = "";
    const name = "Gallery one";
    const timestamp = web3.utils.toBN("1660299317772");

    const receipt = await appManagerInstance.createApplication(
      id,
      price,
      contentHash,
      name,
      timestamp,
      { from: accounts[0] }
    );
    console.log(receipt);

    const n = await appManagerInstance.getNumberOfApplications({
      from: accounts[0],
    });

    const app = await appManagerInstance.getApplication(id);
    console.log(app);

    // console.log(price);
    assert.equal(n.toNumber(), 1, "Application did not create");
    assert.equal(app["0"].eq(id), true, "Wrong APP ID");
    assert.equal(app["1"].eq(web3.utils.toBN(price)), true, "Wrong price");
    assert.equal(app["2"], contentHash, "Wrong content hash");
    assert.equal(app["3"], name, "Wrong name");
    assert.equal(app["4"].eq(timestamp), true, "Wrong timestamp");
  });

  it("...should get create applications", async () => {
    const appManagerInstance = await ApplicationManager.new();

    const app1 = {
      id: web3.utils.toBN(web3.utils.soliditySha3("com.example.application1")),
      price: web3.utils.toWei("0.5", "ether"),
      contentHash: "",
      name: "Gallery one",
      timestamp: web3.utils.toBN("1660299317772"),
    };

    const app2 = {
      id: web3.utils.toBN(web3.utils.soliditySha3("com.example.application2")),
      price: web3.utils.toWei("0.5", "ether"),
      contentHash: "",
      name: "Gallery two",
      timestamp: web3.utils.toBN("1660299317773"),
    };

    await appManagerInstance.createApplication(
      ...Object.values(app1),
      { from: accounts[0] }
    );

    // console.log(receipt1);

    await appManagerInstance.createApplication(
      ...Object.values(app2),
      { from: accounts[1] }
    );

    // console.log(receipt2);

    const apps1 = await appManagerInstance.getCreatedApplications(accounts[0], {from: accounts[0]});
    console.log(apps1);

    const apps2 = await appManagerInstance.getCreatedApplications(accounts[1], {from: accounts[1]});
    console.log(apps2);

    assert.equal(apps1.length, 1, "Address 1 - Wrong number of application");
    assert.equal(apps2.length, 1, "Address 2 - Wrong number of application");
  });
});
