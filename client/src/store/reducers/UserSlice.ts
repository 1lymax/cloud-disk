import {IUser} from "../../models/IUser";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface UserState {
    currentUser: IUser;
    isAuth: boolean;
}

const initialState: UserState = {
    currentUser: {
        id: 0,
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
        },
    },
})

export default userSlice.reducer

export const {setCurrentUser, setAuth, logout} = userSlice.actions


export const userState = (state: RootState) => state.userState