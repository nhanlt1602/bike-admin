import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Patient } from "../PatientDetail/models/Patient.model";

import { Avatar, Chip } from "@mui/material";
import { Box } from "@mui/system";

// import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
// import { IconButton } from "@mui/material";
// import { Box } from "@mui/system";

const Patients: React.FC = () => {
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
            width: "50",
        },
        {
            field: "avatar",
            align: "left",
            title: "Ảnh",
            disableFilter: true,
            disableSort: true,
            index: 2,
            width: "50",
            render: (imgLink: string) => (
                <Avatar sx={{ height: 36, width: 36, borderRadius: "50%" }} src={imgLink} />
            ),
        },
        {
            field: "name",
            align: "left",
            title: "Họ tên",
            index: 3,
            width: "150",
        },
        {
            field: "email",
            align: "left",
            title: "Email",
            index: 4,
            renderLink: (patient: Patient) => `/patients/${patient.email}`,
            width: "200",
        },
        {
            field: "bloodGroup",
            align: "left",
            title: "Nhóm máu",
            index: 5,
            width: "80",
        },
        {
            field: "active",
            align: "center",
            title: "Trạng thái",
            disableFilter: true,
            index: 6,
            render: (props: boolean) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Chip
                            label={props ? "Đã kích hoạt" : "Chưa kích hoạt"}
                            color={props ? "success" : "secondary"}
                        />
                    </Box>
                );
            },
            width: "150",
        },
        {
            field: "isActive",
            align: "left",
            title: "Trạng thái",
            disableSort: true,
            disableFilter: true,
            index: 7,
            render: (props: boolean) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Chip
                            label={props ? "ACTIVE" : "INACTIVE"}
                            color={props ? "success" : "secondary"}
                        />
                    </Box>
                );
            },
            width: "100",
        },
        // {
        //     field: "allergy",
        //     align: "left",
        //     title: "Dị ứng",
        //     index: 6,
        //     width: "200",
        // },
        // {
        //     field: "backgroundDisease",
        //     align: "left",
        //     title: "Bệnh nền",
        //     index: 7,
        //     width: "200",
        // },
        // {
        //     field: "email",
        //     align: "left",
        //     title: "Hồ sơ tư vấn",
        //     disableFilter: true,
        //     disableSort: true,
        //     editable: "never",
        //     index: 8,
        //     render: (props: string) => {
        //         setEmail(props);
        //         return (
        //             <Box display="flex" alignItems="right" justifyContent="center">
        //                 <IconButton
        //                     aria-label="view-list"
        //                     size="small"
        //                     onClick={viewHealthChecksList}
        //                 >
        //                     <ListAltRoundedIcon fontSize="small" />
        //                 </IconButton>
        //             </Box>
        //         );
        //     },
        // },
    ];

    // const viewHealthChecksList = () => {
    //     history.push("/health-checks/" + email);
    // };

    return (
        <React.Fragment>
            <CRUDTable
                title="Quản lí Danh sách Bệnh nhân"
                enableFilter
                sort
                query={`${API_ROOT_URL}/patients`}
                columns={colums}
            />
        </React.Fragment>
    );
};

export default Patients;
