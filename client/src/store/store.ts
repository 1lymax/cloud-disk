import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {userSlice} from "./reducers/UserSlice";
import {fileSlice} from "./reducers/FileSlice";
import {userAPI} from "../services/UserService";
import {fileAPI} from "../services/FileService";


const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
    userState: userSlice.reducer,
    fileState: fileSlice.reducer
})

export const setupStore = (initialState: any = {}) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware)
                .concat(fileAPI.middleware),
        preloadedState: initialState

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']