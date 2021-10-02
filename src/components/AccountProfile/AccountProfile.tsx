import React from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ContactsIcon from "@mui/icons-material/Contacts";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StarBorder from "@mui/icons-material/StarBorder";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Collapse,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const AccountProfile: React.FC = (props) => {
    const [openInfo, setOpenInfo] = React.useState(true);
    const [open, setOpen] = React.useState(true);
    const handleClickInfo = () => {
        setOpenInfo(!openInfo);
    };
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Avatar
                            src="https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fdoctor4u.vn%2F&psig=AOvVaw2I27Njk0IxLLNAaKmhJsnh&ust=1633183021091000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLib_oCvqfMCFQAAAAAdAAAAABAJ"
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                        />
                        <Typography>Bs. Lê Trọng Nhân</Typography>
                        <Rating
                            name="half-rating-read"
                            defaultValue={4.5}
                            precision={0.5}
                            readOnly
                        />
                        <List
                            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={handleClickInfo}>
                                <ListItemIcon>
                                    <PermIdentityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Thông tin" />
                                {openInfo ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openInfo} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <ContactsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Liên hệ" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    <Stack direction="row" spacing={1}>
                        <Chip label="error" color="error" />
                        <Chip label="success" color="success" />
                    </Stack>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default AccountProfile;
