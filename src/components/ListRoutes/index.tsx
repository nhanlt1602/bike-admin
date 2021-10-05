import React from "react";

import { useHistory } from "react-router";

import { Info, Settings } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/Inbox";
import { ListItemIcon, ListItem, Divider, Toolbar, ListItemText, List } from "@mui/material";

export const routes = [
    {
        name: "Accounts",
        path: "/accounts",
        icon: <InboxIcon />,
    },
    {
        name: "Hospitals",
        path: "/hospitals",
        icon: <InboxIcon />,
    },
    {
        name: "Symptoms",
        path: "/symptoms",
        icon: <InboxIcon />,
    },
    {
        name: "Drug",
        path: "/drugs",
        icon: <InboxIcon />,
    },
    {
        name: "Drug Types",
        path: "/drug-types",
        icon: <InboxIcon />,
    },
    {
        name: "Time Frames",
        path: "/time-frames",
        icon: <InboxIcon />,
    },
    {
        name: "Certifications",
        path: "/certifications",
        icon: <InboxIcon />,
    },
];

export const routesControlApp = [
    {
        name: "About us",
        path: "/about-us",
        icon: <Info />,
    },
    {
        name: "Setting",
        path: "/settings",
        icon: <Settings />,
    },
];
const ListRoutes = () => {
    const history = useHistory();
    return (
        <React.Fragment>
            <Toolbar />
            <Divider />
            {routes.map((route) => (
                <ListItem button key={route.name} onClick={() => history?.push(route.path)}>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.name} />
                </ListItem>
            ))}
            <Divider />
            <List>
                {routesControlApp.map((route) => (
                    <ListItem button key={route.name}>
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
};

export default ListRoutes;
