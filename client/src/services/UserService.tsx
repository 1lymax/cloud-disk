import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, UserAuthAnswer, UserAuthQuery} from "../models/IUser";
import Tokens from "../utils/Tokens";

const tokens = Tokens.getInstance()

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
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
                    'Authorization': 'Bearer '+ tokens.getAccessToken()
                }
            }),

        }),
        // updatePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `posts/${post.id}`,
        //         method: 'PUT',
        //         body: post
        //     }),
        //     invalidatesTags: ['Post']
        // }),
        // deletePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `posts/${post.id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Post']
        // })
    })
})
