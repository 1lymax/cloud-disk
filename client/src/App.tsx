import React, {useEffect} from 'react';
import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/UI/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAppDispatch} from "./hooks/hooks";
import Tokens from "./utils/Tokens";
import {userAPI} from "./services/UserService";
import {setAuth, setCurrentUser} from "./store/reducers/UserSlice";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {getErrorMessage} from "./utils/getErrorMessage";
import {useSnackbar} from "notistack";

function App() {
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useAppDispatch()
    const tokens = Tokens.getInstance()

    console.log(tokens)
    useEffect(() => {
        if (tokens.getAccessToken()) {
            const {data, error, isLoading, isSuccess} = userAPI.useTokenQuery()

            if (isSuccess) {
                dispatch(setCurrentUser(data.user))
                dispatch(setAuth(true))
            }
            if (error) {
                enqueueSnackbar(getErrorMessage(error), {variant: "error"});
            }
        }
    }, []);

    return (
        <BrowserRouter>
            <Container fixed>
                <NavBar/>
                <AppRouter/>
            </Container>

        </BrowserRouter>
    );
}

export default App;
