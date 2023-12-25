import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useMenu } from "@/hooks/useMenu";
import { OpenSideMenu, ClosedSideMenu } from "@/layouts/SideMenu";
import { useGetAuthState } from "@/store/auth";

const openDrawerWidth = 256;
const closeDrawerWidth = 56;
const headerHeight = 64;
const envBarHeight = 29;
const STORAGE_KEY_DRAWER = "SYSTEM_DRAWER_OPEN";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { logout: handleLogout } = useLogin();
  const { name } = useMenu();
  const user = useGetAuthState();
  const userAddress = user?.email;

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => {
    const flag = !open;
    setOpen(flag);
    localStorage.setItem(STORAGE_KEY_DRAWER, String(flag));
  }, [open]);

  useEffect(() => {
    const storageDrawerValue =
      localStorage.getItem(STORAGE_KEY_DRAWER) === "true";
    setOpen(storageDrawerValue);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        display: "flex",
      }}
    >
      {open ? (
        <Box
          sx={{
            width: `${openDrawerWidth}px`,
          }}
        >
          <OpenSideMenu />
        </Box>
      ) : (
        <Box
          sx={{
            width: `${closeDrawerWidth}px`,
          }}
        >
          <ClosedSideMenu />
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: "#3c3c5a",
          }}
          elevation={1}
        >
          <Toolbar sx={{ height: `${headerHeight}px` }} disableGutters={true}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              sx={{ flexGrow: 1, fontSize: "24px" }}
            >
              {name}
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontSize: "14px" }}>
              {userAddress}
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box>
          <Box
            sx={{
              maxHeight: `${envBarHeight}px`,
              p: "8px 36px",
              bgcolor: process.env.NEXT_PUBLIC_COLOR,
              margin: "8px 12px 0 12px",
              borderRadius: "4px",
            }}
          >
            <Typography
              sx={{
                color: "#FFF",
                fontSize: "12px",
                lineHeight: 1,
                fontWeight: "bold",
              }}
            >
              SYSTEM {process.env.NEXT_PUBLIC_TITLE}環境
            </Typography>
          </Box>
          <Box
            sx={{
              p: "12px",
              height: `calc( 100vh - ${headerHeight + envBarHeight}px )`,
            }}
          >
            {children}
            <Typography
              sx={{ fontSize: "12px", textAlign: "center", p: "8px 0 16px" }}
            >
              Copyright © by company inc. 2023.
            </Typography>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Layout;
