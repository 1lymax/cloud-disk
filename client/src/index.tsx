import React from 'react';
import {Provider} from "react-redux";
import {createRoot} from 'react-dom/client';
import {SnackbarProvider} from "notistack";

import App from './App';
import {setupStore} from "./store/store";


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
