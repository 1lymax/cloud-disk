import {Navigate, Route, Routes} from 'react-router-dom'
import {publicRoutes} from "../utils/routes";
import {FC} from "react";

const AppRouter: FC = () => {

    //const user = useAppSelector(state => state.userState.currentUser)
    //const isAuth = useAppSelector(state => state.userState.isAuth)


    return (
        <Routes>
            {/*{isAuth && authRoutes.map(({path, Component}) =>*/}
            {/*    <Route key={path} path={path} element={<Component/>}/>*/}
            {/*)}*/}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>

    );
};

export default AppRouter;