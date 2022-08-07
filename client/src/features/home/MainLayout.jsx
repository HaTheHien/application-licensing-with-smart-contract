import DefaultAppBar from "components/AppBar/AppBar";
import { Container, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <>
      <DefaultAppBar />
      <Toolbar sx={{ marginBottom: 1 }} />

      <Container maxWidth="xl" sx={{ bgcolor: "background.default" }}>
        {children ? children : <Outlet />}
      </Container>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;
