import * as React from "react";

import AppBarWithDrawer from "src/components/AppBar";
import DrawerBase from "src/components/Drawer";

import { CssBaseline } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";

const drawerWidth = 360;

const Layout: React.FC<{ children?: React.ReactNode }> = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

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
