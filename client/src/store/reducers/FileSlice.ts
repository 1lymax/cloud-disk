import {RootState} from "../store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFile} from "../../models/IFile";
import {Key} from "react";


export interface IUploadProgress {
    file: String;
    progress: number;
}

interface FileState {
    files: IFile[];
    dirStack: Key[];
    uploadProgress: IUploadProgress[];
    currentDir: Key;
}

const initialState: FileState = {
    files: [],
    dirStack: [],
    uploadProgress: [],
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
        // clearUploadProgress: (state) => {
        //
        // },
        updateUploadProgress: (state, action: PayloadAction<IUploadProgress>) => {
            const update = state.uploadProgress.findIndex(i => i.file === action.payload.file)
            if (update !== -1)
                state.uploadProgress[update]=action.payload
            else
                state.uploadProgress.push(action.payload)
        },
    },
})

export default fileSlice.reducer

export const {setFiles, setCurrentDir, pushDirStack, popDirStack, updateUploadProgress} = fileSlice.actions


export const fileState = (state: RootState) => state.fileState