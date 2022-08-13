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
  };
}

export const ApplicationConverter = {
  fromContract,
};
