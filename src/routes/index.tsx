import { Route, Switch } from "react-router-dom";

import Drugs from "src/containers/DrugManagement";
import DrugTypes from "src/containers/DrugTypeManagement";
import Hospitals from "src/containers/HospitalManagement";
import Symptoms from "src/containers/SymptomManagement";

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
        name: "symptom",
        component: Symptoms,
    },
    {
        path: "/drugs",
        name: "drug",
        component: Drugs,
    },
    {
        path: "/drug-types",
        name: "drugType",
        component: DrugTypes,
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
