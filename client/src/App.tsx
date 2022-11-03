import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from "@mui/material/Container";
import {QueryClient, QueryClientProvider} from 'react-query';

import Navbar from "./components/UI/Navbar";
import AppRouter from "./components/AppRouter";

import "./App.css";


function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Container fixed>
                    <Navbar/>

                    <AppRouter/>
                </Container>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
