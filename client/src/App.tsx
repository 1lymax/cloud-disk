import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Container from "@mui/material/Container";
import {QueryClient, QueryClientProvider} from 'react-query';
import Navbar from "./components/UI/Navbar";

import "./App.css";
import AppRouter from "./components/AppRouter";


function App() {
    const queryClient = new QueryClient()

    //const LazyNavBar = lazy(() => import('./components/UI/Navbar'));
    //const LazyAppRouter = lazy(() => import('./components/AppRouter'));

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
