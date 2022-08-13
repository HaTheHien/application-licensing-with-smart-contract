import StoreIcon from "@mui/icons-material/Store";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const DefaultAppBar = () => {
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.95),
        color: "text.primary",
        borderBottom: "2px solid",
        borderBottomColor: "divider",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LICENSE MARKETPLACE
          </Typography>

          <Divider orientation="vertical" flexItem m={2} />

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, pl: 1 }}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button variant="icon" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </Button>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DefaultAppBar;
