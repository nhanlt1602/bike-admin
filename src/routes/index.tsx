import { Switch } from "react-router";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import AccesssaryManagements from "src/containers/AccessaryManagement";
import DashBoard from "src/containers/DashBoard";
import FeedbackManagement from "src/containers/FeedbackManagement";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import OrderManagement from "src/containers/OrderManagement";
import ServiceManagement from "src/containers/ServiceManagement";
import StatisticManagement from "src/containers/StatisticManagement";
import StoreManagement from "src/containers/StoreManagement";

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
        component: StoreManagement,
    },
    {
        path: "/dash-boards",
        name: "dash board",
        component: DashBoard,
    },
    {
        path: "/order",
        name: "orders",
        component: OrderManagement,
    },
    {
        path: "/accessary",
        name: "accessarys",
        component: AccesssaryManagements,
    },
    {
        path: "/store",
        name: "stores",
        component: StoreManagement,
    },
    {
        path: "/statistic",
        name: "statistic",
        component: StatisticManagement,
    },
    {
        path: "/feedback",
        name: "feedback",
        component: FeedbackManagement,
    },
    {
        path: "/service",
        name: "services",
        component: ServiceManagement,
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
