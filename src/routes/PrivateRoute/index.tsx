import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";

import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
    const user = LocalStorageUtil.getUser();
    if (!user?.email) return <Redirect to="/login" />;

    return <Route {...rest} component={component} />;
};
