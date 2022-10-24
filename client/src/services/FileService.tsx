import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IFile, IFileApiAnswer, IFileCreate} from "../models/IFile";
import {LocalStorage} from "ts-localstorage";
import {ACCESS_TOKEN} from "../utils/consts";
import {Key} from "react";

interface IGetFiles {
    dirid?: Key;
    sort?: String,
    search?: String
}

export const fileAPI = createApi({
    reducerPath: 'fileAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    tagTypes: ['File'],
    endpoints: (build) => ({
        
        getFiles: build.query<IFileApiAnswer, IGetFiles>({
            query: (args) => ({
                url: `api/files`,
                method: 'GET',
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                },
                params: Object.fromEntries(Object.entries(args).filter(([_, v]) => v != ''))


            }),
            providesTags: ['File']

        }),

        createDir: build.mutation<IFile, IFileCreate>({
            query: (params) => ({
                url: 'api/files',
                method: 'POST',
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                },
                body: {
                    name: params.name,
                    type: 'dir',
                    parent: params.parent ? params.parent: undefined
                }
            }),
            invalidatesTags: ['File']
        }),

        uploadFile: build.mutation<IFile, IFileCreate>({
            query: (params) => ({
                url: 'api/files/upload',
                method: 'POST',
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                },
                body: params,
            }),
            invalidatesTags: ['File']
        }),

        deleteFile: build.mutation<IFile, Key>({
            query: (id) => ({
                url: `api/files?id=${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                },
            }),
            invalidatesTags: ['File']
        }),
    })
})