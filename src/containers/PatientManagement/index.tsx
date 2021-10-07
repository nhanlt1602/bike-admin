import React, { useState } from "react";

import { useHistory } from "react-router";
import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Patient } from "./models/Patient.model";

import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

const Patients: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "STT",
            type: "index",
            disableFilter: true,
            disableSort: true,
            editable: "never",
            index: 1,
            width: "80",
        },
        {
            field: "email",
            align: "left",
            title: "Email",
            index: 2,
            renderLink: (props: Patient) => `/patients/${props.email}`,
            width: "250",
        },
        {
            field: "bloodGroup",
            align: "left",
            title: "Nhóm máu",
            index: 3,
            width: "50",
        },
        {
            field: "allergy",
            align: "left",
            title: "Dị ứng",
            index: 4,
            width: "200",
        },
        {
            field: "backgroundDisease",
            align: "left",
            title: "Bệnh nền",
            index: 5,
            width: "200",
        },
        {
            field: "email",
            align: "right",
            title: "Hồ sơ tư vấn",
            disableFilter: true,
            disableSort: true,
            editable: "never",
            index: 6,
            render: (props: string) => {
                setEmail(props);
                return (
                    <Box display="flex" alignItems="right" justifyContent="center">
                        <IconButton
                            aria-label="view-list"
                            size="small"
                            onClick={viewHealthChecksList}
                        >
                            <ListAltRoundedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    const viewHealthChecksList = () => {
        history.push("/health-checks/" + email);
    };

    return (
        <React.Fragment>
            <CRUDTable
                title="Quản lí Danh sách tài khoản"
                enableFilter
                sort
                query={`${API_ROOT_URL}/patients`}
                columns={colums}
            />
        </React.Fragment>
    );
};

export default Patients;
