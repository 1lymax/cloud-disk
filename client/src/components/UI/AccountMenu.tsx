import React, {FC} from 'react';
import {useSnackbar} from "notistack";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";

import {logout} from "../../store/reducers/UserSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const AccountMenu: FC = () => {
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [isOpen, setIsOpen] = React.useState<null | HTMLElement>(null)
    const user = useAppSelector(state => state.userState.currentUser)
    const settings = [
        // 'Profile',
        // 'Account',
        // 'Dashboard',
        {title: 'Logout', handler: () => handleLogout()}
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
        <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1, m: 1}}>
                {user.email.split("@")[0]}
            </Typography>
            <Tooltip title="Open settings">

                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt={user.email.toUpperCase()} src="/static/images/avatar/2.jpg"/>
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
                    <MenuItem key={setting.title} onClick={setting.handler}>
                        <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default AccountMenu