import { Menu, Transition } from "@headlessui/react";
import { ReactComponent as CalculatorIcon } from "assets/calculator.svg";
import { FilledButton, OutlinedButton } from "components/Buttons";
import { useLicenseContext } from "context/LicenseContext";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { havePremiumLicense, accounts, appManagerAddress } =
    useLicenseContext();

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

          <div className="flex items-center gap-2">
            {havePremiumLicense && <h5>💎 PREMIUM 💎</h5>}

            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
                >
                  <span className="sr-only">Open debug menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-7 h-7 p-1"
                  >
                    <path d="m16 35.9-12-12 12.1-12.1 2.15 2.15L8.3 23.9l9.85 9.85Zm15.9.1-2.15-2.15 9.95-9.95-9.85-9.85L32 11.9l12 12Z" />
                  </svg>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white
                            ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
                >
                  <Menu.Item>
                    {() => (
                      <p className="block px-4 py-2 text-sm text-gray-700 font-mono">
                        Accounts:{" "}
                        {accounts && accounts?.length !== 0 && accounts[0]}
                      </p>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {() => (
                      <p className="block px-4 py-2 text-sm text-gray-700 font-mono">
                        Manager contract: {appManagerAddress}
                      </p>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
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
