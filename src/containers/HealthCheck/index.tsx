import React from "react";

import moment from "moment";
import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Patient } from "../PatientManagement/models/Patient.model";

import { Box, Chip } from "@mui/material";
import Util from "src/utils/Util";

// import Util from "src/utils/Util";

const HealthChecks: React.FC = () => {
    const columns: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "STT",
            type: "index",
            disableFilter: true,
            disableSort: true,
            editable: "never",
            index: 1,
            width: "120",
            link: "/health-checks",
        },
        {
            field: "slots",
            align: "left",
            disableSort: true,
            disableFilter: true,
            title: "Thời gian buổi tư vấn",
            index: 2,
            render: (props) => {
                return (
                    <React.Fragment>
                        {props[0]?.startTime?.slice(0, 5)} {"- "}
                        {props[0]?.endTime?.slice(0, 5)}{" "}
                        {moment(props[0]?.assignedDate).format(`DD/MM/YYYY`)}
                    </React.Fragment>
                );
            },
            width: "230",
        },
        {
            field: "patient",
            align: "left",
            title: "Bệnh nhân",
            index: 3,
            width: "200",
            render: (props: Patient) => {
                return <React.Fragment>{props.name}</React.Fragment>;
            },
        },
        {
            field: "slots",
            align: "left",
            title: "Bác sĩ",
            index: 4,
            render: (props) => {
                return <React.Fragment>{props[0]?.doctor?.name}</React.Fragment>;
            },
            width: "200",
        },
        {
            field: "createdTime",
            align: "left",
            title: "Ngày đăng ký",
            index: 5,
            render: (props: string) => {
                return <React.Fragment>{Util.convertDate(props)}</React.Fragment>;
            },
            width: "150",
        },
        {
            field: "status",
            align: "center",
            title: "Trạng thái",
            index: 6,
            width: "100",
            render: (props: string) => {
                switch (props) {
                    case "BOOKED":
                        return (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Chip color="warning" variant="filled" label="Chờ tư vấn"></Chip>
                            </Box>
                        );
                    case "CANCELED":
                        return (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Chip color="error" variant="filled" label="Đã hủy"></Chip>
                            </Box>
                        );
                    case "COMPLETED":
                        return (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Chip color="success" variant="filled" label="Đã tư vấn"></Chip>
                            </Box>
                        );
                    default:
                        return <React.Fragment></React.Fragment>;
                }
            },
        },
    ];

    return (
        <React.Fragment>
            <CRUDTable
                title="Quản lí kiểm tra sức khỏe"
                query={`${API_ROOT_URL}/health-checks`}
                columns={columns}
            />
        </React.Fragment>
    );
};

export default HealthChecks;
