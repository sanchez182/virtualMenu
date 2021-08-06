import { Switch } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import Page404 from '../pages/404';
import Homepage from '../pages/menu/Homepage';
import AlertComponent from '../components/AlertComponent';
import TablesHome from '../pages/menu/TablesHome';

export const AppRouter = () => {
    return (
        <>
            <AlertComponent />
            <Switch>
                <PublicRoute
                    exact
                    path="/tables"
                    component={TablesHome}
                />

                <PublicRoute
                    exact
                    path="/"
                    component={Homepage}
                />

                <PublicRoute
                    exact
                    path="*"
                    component={Page404}
                />

            </Switch>
        </>

    )
}

export default AppRouter;