import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from "@mui/material/Container";

import "./App.css";
import NavBar from "./components/UI/Navbar";
import AppRouter from "./components/AppRouter";


function App() {

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
