import React from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StoreIcon from "@mui/icons-material/Store";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
    Card,
    Collapse,
    Container,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export type store = {
    top: string;
    name: string;
    quantity: number;
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const Data = [
    { name: "Lê Lợi", quantity: 65, top: "Top 1" },
    { name: "Hàng Xanh", quantity: 89, top: "Top 2" },
    { name: "Tấn Phát", quantity: 78, top: "Top 3" },
    { name: "Bình Nhưỡng", quantity: 65, top: "Top 4" },
    { name: "Đại Cát", quantity: 102, top: "Top 5" },
];

const ServiceData = [
    { name: "Lốp xe", quantity: 102, top: "Top 1" },
    { name: "Kính xe", quantity: 102, top: "Top 2" },
    { name: "Bugi", quantity: 102, top: "Top 3" },
    { name: "Nhớt xe", quantity: 102, top: "Top 4" },
    { name: "Bình xe", quantity: 102, top: "Top 5" },
];

const StatisticManagement: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom component="div">
                Xin chào ! Chúc bạn một ngày tốt lành
            </Typography>
            <Box
                sx={{
                    // minHeight: "100%",
                    py: 3,
                }}
            >
                <Typography variant="h4" gutterBottom component="div">
                    Thống kê
                </Typography>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={3} md={6} xs={12}>
                            <Card sx={{ maxWidth: 200 }}>
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        p: 2,
                                        minWidth: 300,
                                    }}
                                >
                                    <Box sx={{ color: "text.secondary" }}>Đơn đã hoàn thành</Box>
                                    <Box
                                        sx={{
                                            color: "text.primary",
                                            fontSize: 34,
                                            fontWeight: "medium",
                                        }}
                                    >
                                        12.3 K
                                    </Box>
                                    <TrendingUpIcon
                                        sx={{
                                            color: "success.dark",
                                            fontSize: 16,
                                            verticalAlign: "sub",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            color: "success.dark",
                                            display: "inline",
                                            fontWeight: "medium",
                                            mx: 0.5,
                                        }}
                                    >
                                        18.77%
                                    </Box>
                                    <Box
                                        sx={{
                                            color: "text.secondary",
                                            display: "inline",
                                            fontSize: 12,
                                        }}
                                    >
                                        so với tuần trước
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            <Card sx={{ maxWidth: 200 }}>
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        p: 2,
                                        minWidth: 300,
                                    }}
                                >
                                    <Box sx={{ color: "text.secondary" }}>Đơn bị hủy</Box>
                                    <Box
                                        sx={{
                                            color: "text.primary",
                                            fontSize: 34,
                                            fontWeight: "medium",
                                        }}
                                    >
                                        0.3 K
                                    </Box>
                                    <TrendingUpIcon
                                        sx={{
                                            color: "red",
                                            fontSize: 16,
                                            verticalAlign: "sub",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            color: "success.dark",
                                            display: "inline",
                                            fontWeight: "medium",
                                            mx: 0.5,
                                        }}
                                    >
                                        2.1 k
                                    </Box>
                                    <Box
                                        sx={{
                                            color: "text.secondary",
                                            display: "inline",
                                            fontSize: 12,
                                        }}
                                    >
                                        so với tuần trước
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <Card sx={{ maxWidth: 600 }}>
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        p: 2,
                                        minWidth: 600,
                                    }}
                                >
                                    <Box sx={{ color: "text.secondary" }}>Tổng số tiền</Box>
                                    <Box
                                        sx={{
                                            color: "text.primary",
                                            fontSize: 34,
                                            fontWeight: "medium",
                                        }}
                                    >
                                        231.453.000 VNĐ
                                    </Box>
                                    <TrendingUpIcon
                                        sx={{
                                            color: "success.dark",
                                            fontSize: 16,
                                            verticalAlign: "sub",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            color: "success.dark",
                                            display: "inline",
                                            fontWeight: "medium",
                                            mx: 0.5,
                                        }}
                                    >
                                        9.2%
                                    </Box>
                                    <Box
                                        sx={{
                                            color: "text.secondary",
                                            display: "inline",
                                            fontSize: 12,
                                        }}
                                    >
                                        so với tuần trước
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box
                sx={{
                    minHeight: "100%",
                    py: 3,
                }}
            >
                <Typography variant="h4" gutterBottom component="div">
                    Top 5 cửa hàng sửa xe và dịch vụ được sử dụng nhiều nhất
                </Typography>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} xs={12}>
                            <Container maxWidth="lg">
                                {/* <Typography variant="h5" gutterBottom component="div">
                                    Top 5 cửa hàng sửa xe nhiều nhất
                                </Typography> */}
                                <List
                                    sx={{
                                        width: "100%",
                                        maxWidth: 360,
                                        bgcolor: "background.paper",
                                    }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    // subheader={
                                    //     <ListSubheader component="h4" id="nested-list-subheader">
                                    //         Top 5 Cửa hàng sửa xe
                                    //     </ListSubheader>
                                    // }
                                >
                                    <ListItemButton onClick={handleClick}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Cửa hàng" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {Data?.map((item, index) => (
                                                <ListItemButton sx={{ pl: 4 }} key={item.name}>
                                                    <ListItemIcon>
                                                        <StoreIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>{item.name}</ListItemText>
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </List>
                            </Container>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <Container maxWidth="lg">
                                {/* <Typography variant="h5" gutterBottom component="div">
                                    Top 5 Dịch vụ sửa nhiều nhất
                                </Typography> */}
                                <List
                                    sx={{
                                        width: "100%",
                                        maxWidth: 360,
                                        bgcolor: "background.paper",
                                    }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    // subheader={
                                    //     <ListSubheader component="h4" id="nested-list-subheader">
                                    //         Top 5 Cửa hàng sửa xe
                                    //     </ListSubheader>
                                    // }
                                >
                                    <ListItemButton onClick={handleClick}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Dịch vụ" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {ServiceData?.map((item, index) => (
                                                <ListItemButton sx={{ pl: 4 }} key={item.name}>
                                                    <ListItemIcon>
                                                        <StoreIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>{item.name}</ListItemText>
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </List>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default StatisticManagement;
