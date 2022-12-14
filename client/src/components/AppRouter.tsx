import {FC, useEffect} from "react";
import {useSnackbar} from "notistack";
import {Route, Routes} from 'react-router-dom'

import {ACCESS_TOKEN} from "../utils/consts";
import {LocalStorage} from "ts-localstorage";
import {userAPI} from "../services/UserService";
import {authRoutes, publicRoutes} from "../utils/routes";
import {getErrorMessage} from "../utils/getErrorMessage";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {setAuth, setCurrentUser} from "../store/reducers/UserSlice";
import Disk from "./disk/Disk";
import Main from "../Pages/Main/Main";


const AppRouter: FC = () => {

    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useAppDispatch()
    const {data, error, isSuccess, isLoading} = userAPI.useTokenQuery(undefined, {
        skip: LocalStorage.getItem(ACCESS_TOKEN)===null
    })

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCurrentUser(data.user))
            dispatch(setAuth(true))
        }

    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            dispatch(setAuth(false))
            enqueueSnackbar(getErrorMessage(error), {variant: "error"});
            LocalStorage.removeItem(ACCESS_TOKEN)

        }
    }, [error]);

    const isAuth = useAppSelector(state => state.userState.isAuth)

    return (
        <>
            {isLoading
                ?
                <div>Loading...</div>
                :
                <Routes>
                    {isAuth &&
                        authRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>}/>
                    )
                    }

                    {publicRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>}/>
                    )}

                    {isAuth
                        ?
                        <Route path="*" element={<Disk/>}/>
                        :
                        <Route path="*" element={<Main/>}/>
                    }

                </Routes>
            }
        </>
    );
};

export default AppRouter;