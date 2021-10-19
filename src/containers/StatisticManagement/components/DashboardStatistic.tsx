import React from "react";

import { useHistory } from "react-router";

import { alpha, Card, styled, Typography } from "@mui/material";

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
    top: string;
    path: string;
};

const DashBoardStatistic: React.FC<DashboardType> = (props: DashboardType) => {
    const { name, top, path } = props;
    const history = useHistory();

    return (
        <RootStyle
            onClick={() => {
                history?.push(path);
            }}
        >
            {/* <IconWrapperStyle>
                <Icon />
            </IconWrapperStyle> */}
            <Typography variant="h3" noWrap={true} textOverflow="ellipsis">
                {top}
            </Typography>
            <Typography variant="h5" noWrap={true} textOverflow="ellipsis">
                {name}
            </Typography>
        </RootStyle>
    );
};

export default DashBoardStatistic;
