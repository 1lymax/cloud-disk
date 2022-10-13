import Auth from "../Pages/Auth";
import {CLOUD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import Cloud from "../Pages/Cloud";
import Main from "../Pages/Main";

export const authRoutes = [
    {
        path: CLOUD_ROUTE,
        Component: Cloud,
    },
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
]