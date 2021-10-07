import React from "react";

import { useHistory } from "react-router";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { alpha, Card, styled, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";

const RootStyle = styled(Card)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(5, 0),
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    },
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`,
}));

export type DashboardType = {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">>;
    path: string;
};

const DashBoardItem: React.FC<DashboardType> = (props: DashboardType) => {
    const { name, icon: Icon, path } = props;
    const history = useHistory();

    return (
        <RootStyle
            onClick={() => {
                history?.push(path);
            }}
        >
            <IconWrapperStyle>
                <Icon />
            </IconWrapperStyle>
            <Typography variant="h5" noWrap={true} textOverflow="ellipsis">
                {name}
            </Typography>
            <Box display="inline-flex" alignItems="center" justifyContent="center">
                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                    Đi đến
                </Typography>
                <ArrowForwardIcon sx={{ opacity: 0.72 }} fontSize="small" />
            </Box>
        </RootStyle>
    );
};

export default DashBoardItem;
