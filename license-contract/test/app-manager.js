const ApplicationManager = artifacts.require("./ApplicationManager.sol");

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

contract("ApplicationManager", (accounts) => {
  it("...should create new app", async () => {
    const appManagerInstance = await ApplicationManager.new();

    const receipt = await appManagerInstance.createApplication(
      ...Object.values(app1),
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
    assert.equal(app.id.eq(id), true, "Wrong APP ID");
    assert.equal(app.price.eq(web3.utils.toBN(price)), true, "Wrong price");
    assert.equal(app.contentHash, contentHash, "Wrong content hash");
    assert.equal(app.name, name, "Wrong name");
    assert.equal(app.dateCreated.eq(timestamp), true, "Wrong timestamp");
  });

  it("...should get created applications", async () => {
    const appManagerInstance = await ApplicationManager.new();

    await appManagerInstance.createApplication(...Object.values(app1), {
      from: accounts[0],
    });

    // console.log(receipt1);

    await appManagerInstance.createApplication(...Object.values(app2), {
      from: accounts[1],
    });

    // console.log(receipt2);

    const apps1 = await appManagerInstance.getCreatedApplications(accounts[0], {
      from: accounts[0],
    });
    console.log(apps1);

    const apps2 = await appManagerInstance.getCreatedApplications(accounts[1], {
      from: accounts[1],
    });
    console.log(apps2);

    assert.equal(apps1.length, 1, "Address 1 - Wrong number of application");
    assert.equal(apps2.length, 1, "Address 2 - Wrong number of application");
  });

  it("...should get application info from application address", async () => {
    const appManagerInstance = await ApplicationManager.new();

    await appManagerInstance.createApplication(...Object.values(app1), {
      from: accounts[0],
    });

    const apps1 = await appManagerInstance.getCreatedApplications(accounts[0], {
      from: accounts[0],
    });

    assert.equal(apps1.length, 1, "Address 1 - Wrong number of application");

    const info = await appManagerInstance.getApplicationFromAddress(apps1[0]);
    console.log(info);

    assert.equal(info.id.eq(app1.id), true, "Wrong APP ID");
    assert.equal(
      info.price.eq(web3.utils.toBN(app1.price)),
      true,
      "Wrong price"
    );
    assert.equal(info.contentHash, app1.contentHash, "Wrong content hash");
    assert.equal(info.name, app1.name, "Wrong name");
    assert.equal(info.dateCreated.eq(app1.timestamp), true, "Wrong timestamp");
  });

  it("...should reject when the application is already existed on the chain", async () => {
    it("should reject", async function () {
      try {
        const appManagerInstance = await ApplicationManager.new();

        await appManagerInstance.createApplication(...Object.values(app1), {
          from: accounts[0],
        });
        await appManagerInstance.createApplication(...Object.values(app1), {
          from: accounts[1],
        });

        assert.fail("The transaction should have thrown an error");
      } catch (err) {
        assert.include(
          err.message,
          "revert",
          "The error message should contain 'revert'"
        );
      }
    });
  });

  it("...should get all applications", async () => {
    const appManagerInstance = await ApplicationManager.new();

    const applications1 = await appManagerInstance.getAllApplications();
    assert.equal(applications1.length, 0, "Application list is not empty");

    await appManagerInstance.createApplication(...Object.values(app1), {
      from: accounts[0],
    });

    const applications2 = await appManagerInstance.getAllApplications();
    assert.equal(
      applications2.length,
      1,
      "Application list's length should be 1"
    );

    await appManagerInstance.createApplication(...Object.values(app2), {
      from: accounts[1],
    });

    const applications3 = await appManagerInstance.getAllApplications();
    assert.equal(
      applications3.length,
      2,
      "Application list's length should be 2"
    );
  });
});
