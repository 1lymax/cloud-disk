import React from 'react';
import {useNavigate} from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {AppBar, Box, Button, Divider, IconButton, Toolbar, Typography} from "@mui/material";

import Search from "./Search";
import AccountMenu from "./AccountMenu";
import {useAppSelector} from "../../hooks/hooks";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";


const Navbar = () => {
    const isAuth = useAppSelector(state => state.userState.isAuth)
    const navigate = useNavigate()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"
                                onClick={()=>navigate(MAIN_ROUTE)}
                                component="div" sx={{flexGrow: 1}}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{mr: 2}}
                        >
                            <CloudCircleIcon/>
                        </IconButton>
                        Cloud disk
                    </Typography>

                    {isAuth
                        ?
                        <>
                            <Search/>
                            <Divider orientation="vertical" variant="middle"
                            sx={{ml: 3, mr: 3}}
                            />
                            <AccountMenu/>
                        </>

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