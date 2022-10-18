import {RootState} from "../store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFile} from "../../models/IFile";
import {Key} from "react";


interface FileState {
    files: IFile[];
    dirStack: Key[];
    currentDir: Key;
}

const initialState: FileState = {
    files: [],
    dirStack: [],
    currentDir: '',
}

export const fileSlice = createSlice({
    name: 'fileStore',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<IFile[]>) => {
            state.files = action.payload
        },
        setCurrentDir: (state, action: PayloadAction<Key>) => {
            state.currentDir = action.payload
        },
        popDirStack: (state) => {
            state.dirStack.pop()
        },
        pushDirStack: (state, action: PayloadAction<Key>) => {
            state.dirStack.push(action.payload)
        },
    },
})

export default fileSlice.reducer

export const {setFiles, setCurrentDir, pushDirStack, popDirStack} = fileSlice.actions


export const fileState = (state: RootState) => state.fileState