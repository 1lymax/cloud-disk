import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {API_URL} from "../config";
import {ACCESS_TOKEN} from "../utils/consts";
import {LocalStorage} from "ts-localstorage";
import {IUser, UserAuthAnswer, UserAuthQuery} from "../models/IUser";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        login: build.mutation<UserAuthAnswer, UserAuthQuery>({
            query: (query) => ({
                url: `api/auth/login`,
                method: 'POST',
                body: query
            }),

        }),
        registration: build.mutation<IUser, UserAuthQuery>({
            query: (query) => ({
                url: `api/auth/registration`,
                method: 'POST',
                body: query
            }),

        }),
        token: build.query<UserAuthAnswer, void>({
            query: () => ({
                url: `api/auth/token`,
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                }
            }),

        }),
        uploadAvatar: build.mutation<IUser, any>({
            query: (params) => ({
                url: 'api/files/upload/avatar',
                method: 'POST',
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                },
                body: params,
            }),
        }),

        deleteAvatar: build.mutation<IUser, undefined>({
            query: () => ({
                url: `api/files/avatar`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer '+ LocalStorage.getItem(ACCESS_TOKEN),
                },
            }),
        }),
    })
})
