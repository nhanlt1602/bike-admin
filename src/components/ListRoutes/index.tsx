import React from "react";

import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { ListItemIcon, ListItem, Divider, Toolbar, ListItemText, List } from "@mui/material";

const ListRoutes = () => {
    return (
        <React.Fragment>
            <Toolbar />
            <Divider />
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
};

export default ListRoutes;
