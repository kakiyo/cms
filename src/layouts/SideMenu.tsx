import {
  Box,
  Link as MUILink,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { menu } from "@/hooks/useMenu";

export const OpenSideMenu = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box sx={{ height: "100vh", background: theme.palette.background.paper }}>
      <MUILink component={Link} href={"/"} underline="none">
        <Box
          sx={{
            p: "24px",
            bgcolor: process.env.NEXT_PUBLIC_COLOR,
            color: "#fff",
            height: "100px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            SYSTEM
            <br />
            {process.env.NEXT_PUBLIC_TITLE}環境
          </Typography>
        </Box>
      </MUILink>
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ height: "48px" }}>
            <ListItemButton
              component={Link}
              sx={{ height: "100%" }}
              href={item.path}
              selected={router.pathname === item.path}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const ClosedSideMenu = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box sx={{ height: "100vh", background: theme.palette.background.paper }}>
      <MUILink component={Link} href={"/"} underline="none">
        <Box
          sx={{
            bgcolor: process.env.NEXT_PUBLIC_COLOR,
            color: "#fff",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/SYSTEM.png" alt="SYSTEMのロゴ" width={"30px"} />
        </Box>
      </MUILink>
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ height: "48px" }}>
            <ListItemButton
              component={Link}
              sx={{ height: "100%" }}
              href={item.path}
              selected={router.pathname === item.path}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
