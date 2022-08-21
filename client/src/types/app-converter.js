function fromContract(app, web3) {
  return {
    id: web3.utils.numberToHex(app.id),
    price: app.price,
    contentHash: app.contentHash,
    name: app.name,
    date: +app.dateCreated,
    version: +app.version,
    totalSold: +app.totalSold,
    owner: app.owner,
    appAddress: app.appAddress,
    licenseLifeTime: +app.licenseLifeTime,
  };
}

function toContract(data, web3) {
  return [
    web3.utils.toBN(web3.utils.soliditySha3(data.packageName)), // id
    web3.utils.toWei(data.price, "ether"), // price
    "", // content hash
    data.name,
    web3.utils.toBN(data.dateCreated),
    web3.utils.toBN(data.licenseLifeTime),
  ];
}

export const ApplicationConverter = {
  fromContract,
  toContract,
};
