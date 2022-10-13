import React from 'react';
import {AppBar, Box, Button, Divider, IconButton, Toolbar, Typography} from "@mui/material";
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import {useAppSelector} from "../../hooks/hooks";
import AccountMenu from "./AccountMenu";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const Navbar = () => {
    const isAuth = useAppSelector(state => state.userState.isAuth)
    const navigate = useNavigate()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{mr: 2}}
                    >
                        <CloudCircleIcon/>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Cloud disk
                    </Typography>

                    {isAuth
                        ?
                        <AccountMenu/>
                        :
                        <>
                        <Button color="inherit"
                                onClick={() => navigate(LOGIN_ROUTE)}
                                startIcon={<LockOutlinedIcon/>}
                        > Login
                        </Button>
                        <Divider orientation="vertical" flexItem variant="middle" sx={{ m:1 }}/>
                            <Button color="inherit"
                                    startIcon={<HowToRegIcon/>}
                                    onClick={() => navigate(REGISTRATION_ROUTE)}
                            >
                                Sign up
                            </Button>
                        </>
                        }
                        </Toolbar>
                        </AppBar>
                        </Box>
                        );
                    };

                    export default Navbar;