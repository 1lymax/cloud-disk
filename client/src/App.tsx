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
import {getErrorMessage} from "./utils/getErrorMessage";
import {useSnackbar} from "notistack";

function App() {
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useAppDispatch()
    const tokens = Tokens.getInstance()
    const {data, error, isSuccess} = userAPI.useTokenQuery()

    console.log(tokens)
    useEffect(() => {
        if (tokens.getAccessToken()) {
            if (isSuccess) {
                dispatch(setCurrentUser(data.user))
                dispatch(setAuth(true))
            }
            if (error) {
                dispatch(setAuth(false))
                tokens.clear()
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
