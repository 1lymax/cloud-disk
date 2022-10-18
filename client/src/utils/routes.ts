import Auth from "../Pages/Auth";
import {DISK_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import Main from "../Pages/Main";
import Disk from "../components/disk/Disk";

export const authRoutes = [
    {
        path: DISK_ROUTE,
        Component: Disk,
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