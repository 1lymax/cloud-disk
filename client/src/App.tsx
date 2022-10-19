import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from "@mui/material/Container";

import "./App.css";
import NavBar from "./components/UI/Navbar";
import AppRouter from "./components/AppRouter";
import {QueryClient, QueryClientProvider } from 'react-query';


function App() {
    const queryClient = new QueryClient()

        return (
            <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Container fixed>
                <NavBar/>

                <AppRouter/>
            </Container>
        </BrowserRouter>
            </QueryClientProvider>
    );
}

export default App;
