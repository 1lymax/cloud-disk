import Auth from "../Pages/Auth";
import Main from "../Pages/Main";
import Disk from "../components/disk/Disk";
import Profile from "../components/profile/Profile";
import {DISK_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "./consts";


export const authRoutes = [
    {
        path: DISK_ROUTE,
        Component: Disk,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
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