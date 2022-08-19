import InstallMetamaskBanner from "components/blockchain/Info/InstallMetamaskBanner";
import ConnectToMetamaskIndicator from "components/blockchain/ProgressIndicatior/ConnectToMetamaskIndicator";
import MainLayout from "components/common/Layout/MainLayout";
import { useEtherContext } from "context";
import Home from "pages/Home";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ROUTER } from "routes/router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const GlobalRouter = () => {
  const {
    state: { metaMaskEnabled, accounts },
  } = useEtherContext();

  if (!window.ethereum) {
    return <InstallMetamaskBanner />;
  }

  if (!metaMaskEnabled || !accounts) {
    return <ConnectToMetamaskIndicator />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path={ROUTER.home} element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
