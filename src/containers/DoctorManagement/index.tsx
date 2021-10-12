import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Doctor } from "../PatientManagement/models/Doctor.model";

import { Avatar, Rating } from "@mui/material";

const normalColumns: IColumn[] = [
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
        field: "email",
        align: "left",
        title: "Email",
        index: 3,
        renderLink: (data: Doctor) => {
            return "/doctors/" + data.email;
        },
        width: "100",
    },
    {
        field: "name",
        align: "left",
        title: "Tên bác sĩ",
        index: 4,
        width: "120",
    },
    {
        field: "certificateCode",
        align: "left",
        title: "Mã hành nghề",
        index: 5,
        width: "140",
    },
    {
        field: "scopeOfPractice",
        align: "left",
        title: "Chuyên khoa",
        index: 6,
        width: "200",
    },
    {
        field: "numberOfConsultants",
        align: "left",
        title: "Số người tư vấn",
        index: 7,
        width: "140",
    },
    {
        field: "rating",
        align: "left",
        title: "Đánh giá",
        index: 8,
        width: "100",
        render: (props: number) => {
            return <Rating readOnly value={props || 0} />;
        },
    },
];

const verifyColumns: IColumn[] = [
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
        field: "email",
        align: "left",
        title: "Email",
        index: 3,
        renderLink: (data: Doctor) => {
            return "/doctors/" + data.email;
        },
        width: "100",
    },
    {
        field: "name",
        align: "left",
        title: "Tên bác sĩ",
        index: 4,
        width: "120",
    },
    {
        field: "certificateCode",
        align: "left",
        title: "Mã hành nghề",
        index: 5,
        width: "140",
    },
    {
        field: "scopeOfPractice",
        align: "left",
        title: "Chuyên khoa",
        index: 6,
        width: "200",
    },
];
const Doctors: React.FC = () => {
    return (
        <React.Fragment>
            <CRUDTable
                title={
                    window.location.href.includes("verify")
                        ? "Danh sách bác sĩ chưa xác nhận"
                        : "Quản lí bác sĩ"
                }
                enableFilter
                sort
                query={`${API_ROOT_URL}/doctors`}
                initParam={`&is-verify=${window.location.href.includes("verify") ? "-2" : "1"}&`}
                columns={window.location.href.includes("verify") ? verifyColumns : normalColumns}
            />
        </React.Fragment>
    );
};

export default Doctors;
