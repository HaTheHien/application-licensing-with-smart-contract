import Main from "components/Main";
import NoLicence from "components/NoLicence";
import Spinner from "components/Spinner";
import { useLicenseContext } from "context/LicenseContext";

export default function Licence() {
  const { error, haveLicense } = useLicenseContext();
  return (
    <div className="licence">
      {error ? (
        <div>Can't find application contract.</div>
      ) : haveLicense == null ? (
        <Spinner />
      ) : haveLicense ? (
        <Main />
      ) : (
        <NoLicence />
      )}
    </div>
  );
}
