import { Switch } from "react-router";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Accounts from "src/containers/AccountManagement";
import Certifications from "src/containers/CertificateManagement";
import DashBoard from "src/containers/DashBoard";
import AccountManage from "src/containers/DashBoard/AccountManage";
import DoctorManage from "src/containers/DashBoard/DoctorManage";
import GeneralSettingManage from "src/containers/DashBoard/GeneralSetting";
import DiseaseManage from "src/containers/DashBoard/GeneralSetting/DiseaseManage";
import DrugManage from "src/containers/DashBoard/GeneralSetting/DrugManage";
import DiseaseGroups from "src/containers/DiseaseGroupManagement";
import Diseases from "src/containers/DiseaseManagemenent";
import DoctorDetails from "src/containers/DoctorDetail";
import Doctors from "src/containers/DoctorManagement";
import Drugs from "src/containers/DrugManagement";
import DrugTypes from "src/containers/DrugTypeManagement";
import HealthChecks from "src/containers/HealthCheck";
import HealthCheckDetail from "src/containers/HealthCheckDetail";
import Hospitals from "src/containers/HospitalManagement";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import Majors from "src/containers/MajorManagement";
import NotFound from "src/containers/NotFound";
import PatientDetail from "src/containers/PatientDetail";
import Patients from "src/containers/PatientManagement";
import SlotManagement from "src/containers/SlotManagement";
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
        component: DashBoard,
    },
    {
        path: "/dash-boards",
        name: "dash board",
        component: DashBoard,
    },
    {
        path: "/dash-board/account-manage",
        name: "account management",
        component: AccountManage,
    },
    {
        path: "/dash-board/doctor-manage",
        name: "doctor management",
        component: DoctorManage,
    },
    {
        path: "/dash-board/general-setting",
        name: "general settings",
        component: GeneralSettingManage,
    },
    {
        path: "/dash-board/general-setting/drug-manage",
        name: "drug management",
        component: DrugManage,
    },
    {
        path: "/dash-board/general-setting/disease-manage",
        name: "disease management",
        component: DiseaseManage,
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
    // {
    //     name: "Xác nhận Bác sĩ",
    //     path: "/verify/doctors",
    //     component: Doctors,
    // },
    {
        path: "/drug-types",
        name: "drugType",
        component: DrugTypes,
    },
    {
        path: "/patients",
        name: "patients",
        component: Patients,
    },
    {
        path: "/patients/:email",
        name: "patientDetail",
        component: PatientDetail,
    },
    {
        path: "/doctors/:email",
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
    {
        path: "/majors",
        name: "majors",
        component: Majors,
    },
    {
        path: "/doctors",
        name: "doctor",
        component: Doctors,
    },
    {
        path: "/health-checks",
        name: "healthChecks",
        component: HealthChecks,
    },
    {
        path: "/health-checks/:id",
        name: "healthCheckDetail",
        component: HealthCheckDetail,
    },
    {
        path: "/slots/:id",
        name: "slots",
        component: SlotManagement,
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
