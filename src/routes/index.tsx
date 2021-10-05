import { Switch } from "react-router";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Accounts from "src/containers/AccountManagement";
import Certifications from "src/containers/CertificateManagement";
import DiseaseGroups from "src/containers/DiseaseGroupManagement";
import Diseases from "src/containers/DiseaseManagemenent";
import DoctorDetails from "src/containers/DoctorDetail";
import Drugs from "src/containers/DrugManagement";
import DrugTypes from "src/containers/DrugTypeManagement";
import Hospitals from "src/containers/HospitalManagement";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import NotFound from "src/containers/NotFound";
import PatientDetail from "src/containers/PatientDetail";
import Symptoms from "src/containers/SymptomManagement";
import TimeFrames from "src/containers/TimeFrame";

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
        path: "/accounts",
        name: "accounts",
        component: Accounts,
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
    {
        path: "/doctors/:id",
        name: "doctorDetail",
        component: DoctorDetails,
    },
    {
        path: "/not-found",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: "/time-frames",
        name: "timeFrame",
        component: TimeFrames,
    },
    {
        path: "/disease",
        name: "disease",
        component: Diseases,
    },
    {
        path: "/disease-group",
        name: "diseaseGroup",
        component: DiseaseGroups,
    },
    {
        path: "/certifications",
        name: "certifications",
        component: Certifications,
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
