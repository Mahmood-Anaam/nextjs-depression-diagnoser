"use client";

import React from "react";
import * as material from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import DrawerItems from "./DrawerItems";

const drawerWidth = 240;

const DrawerPaper = styled("div")(({ theme }) => ({
  width: drawerWidth,
  boxSizing: "border-box",
  paddingTop: theme.spacing(8),
}));

const Drawer = ({ open,userRole, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = material.useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <material.Drawer
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
      variant={isMobile ? "temporary" : "persistent"}
      sx={{
        [`& .MuiDrawer-paper`]: { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <DrawerPaper>
        <DrawerItems userRole={userRole}/>
      </DrawerPaper>
    </material.Drawer>
  );
};

export default Drawer;
