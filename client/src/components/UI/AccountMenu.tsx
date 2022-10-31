import React, {FC} from 'react';
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";

import {API_URL} from "../../config";
import {logout} from "../../store/reducers/UserSlice";
import {DISK_ROUTE, PROFILE_ROUTE} from "../../utils/consts";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


const AccountMenu: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const user = useAppSelector(state => state.userState.currentUser)
    const [isOpen, setIsOpen] = React.useState<null | HTMLElement>(null)

    const settings = [
        {icon: <ManageAccountsIcon/>, title: 'Profile', handler: () => navigate(PROFILE_ROUTE)},
        {icon: <FilterDramaIcon/>, title: 'My disk', handler: () => navigate(DISK_ROUTE)},
        {icon: <></>, title: 'Divider', handler: undefined},
        // 'Account',
        // 'Dashboard',
        {icon: <LogoutIcon/>, title: 'Logout', handler: () => handleLogout()}
    ];


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setIsOpen(null);
    };

    const handleLogout = () => {
        dispatch(logout())
        enqueueSnackbar("You have successfully logged out", {variant: "success"});
    };

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1, m: 1}}>
                {user.email.split("@")[0]}
            </Typography>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}
                    aria-label="Open settings"
                >
                    <Avatar alt={user.email.toUpperCase()} src={API_URL + user?.avatar}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(isOpen)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.title} onClick={setting.handler} onClickCapture={handleCloseUserMenu}>
                        {setting.title === 'Divider'
                            ? <Divider/>
                            : <>
                                <ListItemIcon>
                                    {setting.icon}
                                </ListItemIcon>
                                <Typography textAlign="center">{setting.title}</Typography>
                            </>
                        }

                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default AccountMenu