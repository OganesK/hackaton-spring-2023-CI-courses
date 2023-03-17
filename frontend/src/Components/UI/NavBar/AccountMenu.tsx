import React, { useContext } from 'react';

import { Box, Avatar, Menu, MenuItem, Divider, IconButton, Tooltip } from '@mui/material';

import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useHistory } from 'react-router-dom';

import { userContext } from '../../../Context/context';

export default function AccountMenu(props: { logOutHandler: () => void }): JSX.Element {
  const history = useHistory();
  const { user } = useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const context = useContext(userContext);

  const handleClick: (event: React.MouseEvent<HTMLElement>) => void = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick: () => void = () => {
    history.push(`/profile/${context.user.id}`);
  };

  const handleClose: () => void = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Настройки аккаунта">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar?.link} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> Профиль
        </MenuItem>
        <Divider />
        <MenuItem onClick={(): void => history.push('/messages')}>
          <ListItemIcon>
            <MessageIcon fontSize="small" />
          </ListItemIcon>
          Сообщения
        </MenuItem>
        
        <MenuItem onClick={props.logOutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
}
