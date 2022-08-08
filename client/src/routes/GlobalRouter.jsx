import MainLayout from "components/common/Layout/MainLayout";
import Home from "pages/home/Home";
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
