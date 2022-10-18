import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userAPI} from "../services/UserService";
import {userSlice} from "./reducers/UserSlice";
import {fileAPI} from "../services/FileService";
import {fileSlice} from "./reducers/FileSlice";

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
    userState: userSlice.reducer,
    fileState: fileSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware)
                .concat(fileAPI.middleware),

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']