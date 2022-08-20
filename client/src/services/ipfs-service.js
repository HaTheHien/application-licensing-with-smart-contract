import ipfs from "utils/ipfs";

export const APP_DIR = "apps";
export const METADATA_FILE = "metadata.json";

async function uploadApp(appId, file) {
  if (!appId || !file) {
    throw new Error("App ID, File is undefined or null");
  }

  try {
    const appDir = `/${APP_DIR}/${appId}`;
    const fileName = `${new Date().getTime()}_${file.name}`;
    const filePath = `${appDir}/${fileName}`;
    await ipfs.files.write(filePath, file, { create: true });

    // const result = await ipfs.files.ls(`${appDir}/`);
    for await (const f of ipfs.files.ls(filePath)) {
      if (f.name === fileName) {
        return f.cid;
      }
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}

function getLinkFromCidV0(cidString) {
  return `http://localhost:8080/ipfs/${cidString}`;
}

export const IpfsService = {
  uploadApp,
  getLinkFromCidV0,
};
