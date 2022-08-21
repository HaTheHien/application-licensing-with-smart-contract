import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import StoreIcon from "@mui/icons-material/Store";
import { Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {
  alpha,
  AppBar,
  Box,
  Container,
  Divider,
  Menu,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useEtherContext } from "context";
import { useCallback, useState } from "react";

const DefaultAppBar = () => {
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const {
    state: { accounts, appManagerContract },
  } = useEtherContext();
  console.log(appManagerContract);

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
            level="h6"
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
            <Tooltip title="Debug info">
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <DeveloperModeIcon />
              </IconButton>
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
              <Stack spacing={1} minWidth={200} p={2} alignItems="start">
                {accounts && accounts?.length !== 0 && (
                  <Typography>
                    👤 Account{" "}
                    <Typography level="caption" fontFamily="monospace">
                      {accounts[0]}
                    </Typography>
                  </Typography>
                )}

                <Typography>
                  📜 Manager contract{" "}
                  <Typography level="caption" fontFamily="monospace">
                    {appManagerContract?._address}
                  </Typography>
                </Typography>
              </Stack>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DefaultAppBar;
