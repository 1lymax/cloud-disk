import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {setupStore} from "./store/store";
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore()

root.render(
    <SnackbarProvider maxSnack={3} preventDuplicate>
        <Provider store={store}>
            <App/>
        </Provider>
    </SnackbarProvider>
);
