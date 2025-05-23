import React from "react";
import { useLocation, NavLink } from 'react-router';
import { Box } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from '@tabler/icons-react';
import Menuitems from "./MenuItems";
import logoicn from "../../../assets/images/logos/logo-dark.svg";
// import Upgrade from "./Upgrade"; 

const renderMenuItems = (items, pathDirect) => {


  return items.map((item) => {


    const Icon = item.icon ? item.icon : IconPoint;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader

      return (
        <Box sx={{ margin: "0 -24px", textTransform: 'uppercase' }} key={item.subheader}>
          <Menu
            subHeading={item.subheader}
            key={item.subheader}

          />
        </Box>
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <MenuItem
        key={item.id}
        isSelected={pathDirect === item?.href}
        icon={itemIcon}
        component={NavLink}
        link={item.href ? item.href : "#"}
        target={item.href && item.href.startsWith("https") ? "_blank" : "_self"}
        badge={!!item.chip} 
        badgeContent={item.chip || ""}
        badgeColor='secondary'
        badgeTextColor="#1a97f5"
        disabled={item.disabled}
        borderRadius='9px'
      >
        {item.title}
      </MenuItem>


    );
  });
};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;

  return (
    <Box sx={{ px: "24px", overflowX: 'hidden' }}>
      <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#1e4db7"} themeSecondaryColor={'#1a97f51a'}>
        <Box sx={{ margin: "0 -24px" }}>
          <Logo img={logoicn}  component={NavLink} to="/" ></Logo>
        </Box>
        {renderMenuItems(Menuitems, pathDirect)}
      </MUI_Sidebar>
      {/* <Upgrade /> */}
    </Box>
  );
};

export default SidebarItems;

