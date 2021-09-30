import React from "react";

import { BrowserRouter } from "react-router-dom";
import RouteComponent from "src/routes";

import SnackbarProvider from "src/context/SnackbarProvider.context";

const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <SnackbarProvider>
                    <RouteComponent />
                </SnackbarProvider>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
