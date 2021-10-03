import { Switch } from "react-router";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Drugs from "src/containers/DrugManagement";
import DrugTypes from "src/containers/DrugTypeManagement";
import Hospitals from "src/containers/HospitalManagement";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import PatientDetail from "src/containers/PatientDetail";
import Symptoms from "src/containers/SymptomManagement";

export const publicRoutes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];
export const privateRoutes = [
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
    {
        path: "/patients/:id",
        name: "patientDetail",
        component: PatientDetail,
    },
];

const RouteComponent = () => {
    return (
        <Switch>
            {publicRoutes.map((route) => (
                <PublicRoute
                    key={route.name}
                    exact={true}
                    path={route.path}
                    component={route.component}
                />
            ))}
            <Layout>
                {privateRoutes.map((route) => (
                    <PrivateRoute
                        exact={true}
                        key={route.name}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Layout>
        </Switch>
    );
};

export default RouteComponent;
