import React from "react";

import axios from "src/axios";

import { AccountCircle } from "@mui/icons-material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Account } from "src/containers/AccountManagement/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

interface IAppBarWithDrawer {
    drawerWidth: number;
    handleDrawerToggle: () => void;
}

type Notification = {
    id: number;
    content: string;
    userId: number;
    createdDate: string;
    isSeen: boolean;
    isActive: boolean;
    user?: Account;
};

const AppBarWithDrawer: React.FC<IAppBarWithDrawer> = (props: IAppBarWithDrawer) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElNoti, setAnchorElNoti] = React.useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = React.useState<Notification[]>([]);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotiMenu = (event: React.MouseEvent<HTMLElement>) => {
        const user = LocalStorageUtil.getItem("user");
        if (user) {
            axios
                .get(`/notifications?user-id=${user.id}&page-offset=1&limit=20`)
                .then((response) => {
                    setNotifications(response.data.content);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                });
        }
        setAnchorElNoti(event.currentTarget);
    };

    const logout = () => {
        LocalStorageUtil.clear();
        setAnchorEl(null);
        window.location.reload();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseNoti = () => {
        setAnchorElNoti(null);
    };

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
                <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="div">
                    TeleMedicine App Admin
                </Typography>
                <IconButton
                    size="large"
                    aria-label="notification"
                    aria-controls="noti-menu"
                    aria-haspopup="true"
                    onClick={handleNotiMenu}
                    color="inherit"
                >
                    <CircleNotificationsIcon />
                </IconButton>
                <Menu
                    id="noti-menu"
                    anchorEl={anchorElNoti}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElNoti)}
                    onClose={handleCloseNoti}
                    PaperProps={{
                        style: {
                            maxHeight: 200,
                            width: "30ch",
                        },
                    }}
                >
                    {notifications.length === 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 100,
                                p: 1,
                            }}
                        >
                            <Typography>Bạn chưa có thông báo mới</Typography>
                        </Box>
                    ) : (
                        notifications.map((item) => (
                            <MenuItem key={item.id} onClick={handleClose}>
                                {item.content}
                            </MenuItem>
                        ))
                    )}
                </Menu>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
                    <MenuItem onClick={logout}>Đăng xuất</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWithDrawer;
