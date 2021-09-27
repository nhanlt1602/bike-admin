import ListRoutes from "../ListRoutes";

import { Drawer } from "@mui/material";
import { Box } from "@mui/system";

export interface IDrawerBase {
    window?: () => Window;
    mobileOpen: boolean;
    drawerWidth: number;
    handleDrawerToggle: () => void;
}
const DrawerBase: React.FC<IDrawerBase> = (props: IDrawerBase) => {
    const { window } = props;

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
                }}
            >
                <ListRoutes />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
                }}
                open
            >
                <ListRoutes />
            </Drawer>
        </Box>
    );
};

export default DrawerBase;
