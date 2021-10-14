import * as React from "react";

import { onMessageListener } from "src/config/firebase";

import AppBarWithDrawer from "src/components/AppBar";
import DrawerBase from "src/components/Drawer";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { CssBaseline, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";

const drawerWidth = 250;

const Layout: React.FC<{ children?: React.ReactNode }> = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const showSnackBar = useSnackbar();
    onMessageListener()
        .then((payload) => {
            // eslint-disable-next-line no-console
            console.log(payload);
            showSnackBar(
                {
                    variant: "filled",
                    color: "success",
                    children: (
                        <React.Fragment>
                            <Typography variant="h6" align="left">
                                {payload.notification?.title || ""}
                            </Typography>
                            <Typography align="left">{payload.notification?.body || ""}</Typography>
                        </React.Fragment>
                    ),
                },
                {
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                }
            );
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log("failed: ", err));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarWithDrawer
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            ></AppBarWithDrawer>
            <DrawerBase
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
