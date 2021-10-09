import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { HealthCheck } from "./models/HealthCheck.model";

import { Typography } from "@mui/material";
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
            width: "80",
        },

        {
            field: "email",
            align: "left",
            title: "Email",
            disableFilter: true,
            disableSort: true,
            index: 2,
            render: (props: HealthCheck) => {
                return (
                    <React.Fragment>
                        <Typography align="center">{props?.patient?.email}</Typography>
                    </React.Fragment>
                );
            },
            width: "230",
        },
        {
            field: "height",
            align: "left",
            title: "Chiều cao(cm)",
            index: 3,
            width: "80",
        },
        {
            field: "weight",
            align: "left",
            title: "Cân nặng(kg)",
            index: 4,
            width: "80",
        },

        {
            field: "backgroundDisease",
            align: "left",
            title: "Bệnh nền",
            index: 5,
            width: "80",
        },
        {
            field: "advice",
            align: "left",
            title: "Lời khuyên",
            index: 6,
            width: "80",
        },
        {
            field: "rating",
            align: "left",
            title: "Đánh giá",
            index: 7,
            width: "80",
        },
        {
            field: "createdTime",
            align: "left",
            title: "Ngày đăng ký",
            index: 8,
            render: (props: string) => {
                return <Typography align="center">{Util.convertDate(props)}</Typography>;
            },
            width: "80",
        },
        {
            field: "canceledTime",
            align: "left",
            title: "Ngày hủy",
            index: 9,
            // render: (props: string) => {
            //     return
            //     <Typography align="center">{Util.convertDate(props)}</Typography>;
            // },
            width: "80",
        },
        {
            field: "reasonCancel",
            align: "left",
            title: "Lý do hủy",
            index: 10,
            width: "80",
        },
    ];

    return (
        <React.Fragment>
            <CRUDTable
                title="Quản lí kiểm tra sức khỏe"
                enableFilter
                sort
                query={`${API_ROOT_URL}/health-checks`}
                columns={columns}
                action={{
                    onDelete: true,
                }}
            />
        </React.Fragment>
    );
};

export default HealthChecks;
