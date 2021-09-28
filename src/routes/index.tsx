import { Route, Switch } from "react-router-dom";

import Hospitals from "src/containers/HospitalManagement";

export const routes = [
    {
        path: "/",
        name: "home",
        component: Hospitals,
    },
    {
        path: "/hospitals",
        name: "hospital",
        component: Hospitals,
    },
    {
        path: "/symptoms",
        name: "Symptom",
        component: Hospitals,
    },
];

const RouteComponent = () => {
    return (
        <Switch>
            {routes.map((route) => {
                return <Route key={route.name} exact={true} {...route} />;
            })}
        </Switch>
    );
};

export default RouteComponent;
