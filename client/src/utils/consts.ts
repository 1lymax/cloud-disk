import {LocalKey} from "ts-localstorage";

export const LOGIN_ROUTE = '/login'
export const PROFILE_ROUTE = '/profile'
export const REGISTRATION_ROUTE = '/registration'


export const DISK_ROUTE = '/disk'
export const MAIN_ROUTE = '/'


export const ACCESS_TOKEN = new LocalKey("access_token", "");
export const REFRESH_TOKEN = new LocalKey("refresh_token", "");


