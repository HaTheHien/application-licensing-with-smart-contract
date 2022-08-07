import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Home, MainLayout } from "features/home";
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
