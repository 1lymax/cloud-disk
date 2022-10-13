import {IUser} from "../../models/IUser";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import Tokens from "../../utils/Tokens";

const tokens = Tokens.getInstance()

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
            tokens.clear();
        },
    },
})

export default userSlice.reducer

export const {setCurrentUser, setAuth, logout} = userSlice.actions


export const userState = (state: RootState) => state.userState