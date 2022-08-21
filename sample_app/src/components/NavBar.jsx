import { ReactComponent as CalculatorIcon } from "assets/calculator.svg";
import "./styles.css";
import { FilledButton, OutlinedButton } from "components/Buttons";
import { useLicenseContext } from "context/LicenseContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { havePremiumLicense } = useLicenseContext();

  return (
    <nav className="accent-gray-100 fixed border-b-gray-200 border-b-2 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:justify-start">
            <div className="flex-shrink-0 flex items-center justify-center h-full">
              <Link to="/">
                <CalculatorIcon className="block lg:hidden h-14 w-auto fill-current:accent-blue-500" />
              </Link>
              <Link to="/">
                <CalculatorIcon className="hidden lg:block h-14 w-auto fill-current:accent-blue-500" />
              </Link>
            </div>

            <div className="hidden sm:flex sm:ml-6 h-full items-center justify-center">
              <div className="flex space-x-4 items-center">
                <FilledButton>
                  <a href="/" aria-current="page">
                    Home
                  </a>
                </FilledButton>

                <OutlinedButton>
                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Marketplace
                  </a>
                </OutlinedButton>
              </div>
            </div>
          </div>
          <div className="flex">
            {havePremiumLicense && <h5>💎 PREMIUM 💎</h5>}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <FilledButton>
            <a href="/" aria-current="page">
              Home
            </a>
          </FilledButton>

          <OutlinedButton>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marketplace
            </a>
          </OutlinedButton>
        </div>
      </div>
    </nav>
  );
}
