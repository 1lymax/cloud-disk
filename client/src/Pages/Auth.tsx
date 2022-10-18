import {useSnackbar} from 'notistack';
import {LocalStorage} from "ts-localstorage";
import React, {useEffect, useState} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Box, Grid, Link, TextField, Typography} from '@mui/material';

import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {userAPI} from "../services/UserService";
import {getErrorMessage} from "../utils/getErrorMessage";
import {setAuth, setCurrentUser} from "../store/reducers/UserSlice";
import {ACCESS_TOKEN, DISK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";


const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const isAuth = useAppSelector(state => state.userState.isAuth)
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login, {
        isLoading: loginLoading,
        error: loginError,
        isSuccess: loginSuccess,
        data: loginData
    }] = userAPI.useLoginMutation()
    const [registration, {
        isLoading: regLoading,
        error: regError,
        isSuccess: regSuccess,
    }] = userAPI.useRegistrationMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLogin)
            login({email, password})
        else
            registration({email, password})
    };

    useEffect(() => {
        if (loginError || regError)
            enqueueSnackbar(getErrorMessage(loginError || regError), {variant: "error"});
    }, [loginError, regError]);

    useEffect(() => {
        if (loginSuccess) {
            console.log('login success')
            enqueueSnackbar("Successfully logged in", {variant: "success"});
            dispatch(setCurrentUser(loginData?.user));
            dispatch(setAuth(true))
            LocalStorage.setItem(ACCESS_TOKEN, loginData?.token);
        }
    }, [loginSuccess]);

    useEffect(() => {
        console.log('navigate to disk')
        if (isAuth) navigate(DISK_ROUTE)
    }, [isAuth]);

    useEffect(() => {
        if (regSuccess) {
            enqueueSnackbar("User was created.", {variant: "success"});
            login({email, password})
        }
    }, [regSuccess]);


    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                {isLogin ? <LockOutlinedIcon/> : <HowToRegIcon/> }
            </Avatar>
            <Typography component="h1" variant="h5">
                {isLogin ? 'Sign in' : 'Sign up'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    id="email"
                    required
                    fullWidth
                    autoFocus
                    name="email"
                    margin="normal"
                    value={email}
                    autoComplete="email"
                    label="Email Address"
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    id="password"
                    margin="normal"
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                />
                {/*<FormControlLabel*/}
                {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                {/*    label="Remember me"*/}
                {/*/>*/}
                <LoadingButton
                    fullWidth
                    type="submit"
                    loading={loginLoading || regLoading}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {isLogin ? 'Sign in' : 'Sign up'}
                </LoadingButton>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                            <Typography variant="body2">
                                {isLogin ? 'Don\'t have an account? Sign up' : 'Already registered? Sign in'}
                            </Typography>
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Auth;