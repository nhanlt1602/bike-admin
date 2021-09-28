import { BrowserRouter } from "react-router-dom";
import RouteComponent from "src/routes";

import Layout from "../Layout";

import SnackbarProvider from "src/context/SnackbarProvider.context";

const App = () => {
    return (
        <BrowserRouter>
            <SnackbarProvider>
                <Layout>
                    <RouteComponent />
                </Layout>
            </SnackbarProvider>
        </BrowserRouter>
    );
};

export default App;
