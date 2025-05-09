import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Menu,
  MenuItem, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { IconMenu, IconBell } from '@tabler/icons-react';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.primary.main,
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'space-between', // This ensures proper spacing
  }));

  return (
    <AppBarStyled position="sticky">
      <ToolbarStyled>
        {/* Left side - Mobile menu button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "inline-flex",
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>
        </Box>

        {/* Right side - Notification and Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notification bell */}
          <IconButton
            color="inherit"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Badge variant="dot" color="warning">
              <IconBell size="21" stroke="1.5" />
            </Badge>
          </IconButton>

          {/* Notification menu */}
          <Menu
            id="notification-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={menuPosition ? { 
              top: menuPosition.top, 
              left: menuPosition.left 
            } : undefined}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: 9,
                minWidth: '280px',
                bgcolor: 'background.paper'
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="body1" color="text.primary">Item 1</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="body1" color="text.primary">Item 2</Typography>
            </MenuItem>
          </Menu>


          {/* Profile */}
          <Profile />
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func,
};

export default Header;