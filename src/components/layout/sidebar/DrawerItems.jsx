'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import navigationData from "./navigationData";

const DrawerItems = ({ toggleMobileSidebar,userRole }) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }}component="div">
        {navigationData.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            if(!(item.role && item.role!=userRole)){
              return <NavGroup item={item} key={item.subheader} />;
            }
            

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            if(!(item.role && item.role!=userRole)){
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
          }
        })}
      </List>
    </Box>
  );
};

export default DrawerItems;
