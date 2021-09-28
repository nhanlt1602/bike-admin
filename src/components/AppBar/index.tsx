import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface IAppBarWithDrawer {
    drawerWidth: number;
    handleDrawerToggle: () => void;
}

const AppBarWithDrawer: React.FC<IAppBarWithDrawer> = (props: IAppBarWithDrawer) => {
    const theme = useTheme();
    return (
        <AppBar
            position="fixed"
            style={{
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    TeleMedicine App Admin
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWithDrawer;
