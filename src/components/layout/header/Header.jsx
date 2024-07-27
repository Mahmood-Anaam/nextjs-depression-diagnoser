"use client";

import React, { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { IconMenu2 } from "@tabler/icons-react";
import Logo from "../shared/logo/Logo";
import Profile from "./Profile";
import { APP_NAME } from "@/utils/constants";
import Drawer from "@/components/layout/sidebar/Drawer";


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
}));
const drawerWidth = 240;
const Header = ({userPayload}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };


 

  return (
    <>
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: "20px" }}
          onClick={handleDrawerToggle}
        >
          <IconMenu2 />
        </IconButton>

        <Logo src="/images/logo.png" width={30} height={30} title={APP_NAME} />

        <Stack spacing={1} direction="row" alignItems="center">
       
          

        {!userPayload?(
        
          <Button
            variant="contained"
            component={Link}
            href="/login"
            disableElevation
            color="primary"
          >
            Login
          </Button>
        ):(
          <Typography variant="body1" component={"div"} noWrap={true}>
       
            {userPayload.username}
            </Typography>
        )

       
        }

<Profile />
        </Stack>
      
      </Toolbar>
    </StyledAppBar>
    <div style={{marginLeft: isMobile ? 0 : drawerOpen ? `${drawerWidth}px` : 0,}}>
    <Drawer userRole={userPayload?.role} open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
    
    </div>
    </>
  );
};

export default Header;
