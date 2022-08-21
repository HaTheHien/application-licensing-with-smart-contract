import { FilledButton, OutlinedButton } from "components/Buttons";
import { useLicenseContext } from "context/LicenseContext";
import { useCallback } from "react";

const NoLicence = () => {
  const { checkLicense, web3, accounts } = useLicenseContext();
  const onReloadButtonClicked = useCallback(async () => {
    console.log(accounts, web3);
    return await checkLicense(web3, accounts);
  }, [accounts, checkLicense, web3]);
  return (
    <div className="flex flex-col gap-y-1 items-center">
      <h1 style={{ fontSize: "50pt", margin: 0 }}>📜</h1>
      <h5>You don't have license to use the app</h5>
      <div className="flex flex-row gap-x-2 justify-center pt-2">
        <FilledButton>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
          >
            🏪 Buy license
          </a>
        </FilledButton>
        <OutlinedButton onClick={onReloadButtonClicked}>
          Load license
        </OutlinedButton>
      </div>
    </div>
  );
};

export default NoLicence;
