import {createSlice} from "@reduxjs/toolkit";
import {LocalStorage} from "ts-localstorage";

import {RootState} from "../store";
import {IUser} from "../../models/IUser";
import {ACCESS_TOKEN} from "../../utils/consts";


interface UserState {
    currentUser: IUser;
    isAuth: boolean;
}

const initialState: UserState = {
    currentUser: {
        id: '',
        email: '',
        diskSpace: 0,
        usedSpace: 0,
        avatar: '',
    },
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        logout: (state) => {
            state.isAuth = false
            state.currentUser = {
                id: '',
                email: '',
                diskSpace: 0,
                usedSpace: 0,
                avatar: '',
            }
            LocalStorage.setItem(ACCESS_TOKEN, '');
        },
    },
})

export default userSlice.reducer

export const {setCurrentUser, setAuth, logout} = userSlice.actions


export const userState = (state: RootState) => state.userState