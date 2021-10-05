import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Account } from "./models/Account.model";
import { Role } from "./models/Role.model";

import { Box, Chip, Typography } from "@mui/material";
import Util from "src/utils/Util";

const Accounts: React.FC = () => {
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
            renderLink: (props: Account) => {
                return props?.role?.id === 1 ? "/doctors" : "/patients";
            },
            width: "250",
        },
        {
            field: "lastName",
            align: "left",
            title: "Họ",
            index: 3,
            width: "80",
        },
        {
            field: "firstName",
            align: "left",
            title: "Tên",
            index: 4,
            width: "80",
        },
        {
            field: "phone",
            align: "center",
            title: "Số ĐT",
            index: 5,
            render: (props: string) => {
                return <Typography align="center">{props}</Typography>;
            },
        },
        {
            field: "dob",
            align: "center",
            title: "Ngày sinh",
            index: 6,
            render: (props: string) => {
                return <Typography align="center">{Util.convertDate(props)}</Typography>;
            },
            width: "150",
        },
        {
            field: "isMale",
            align: "center",
            title: "Giới tính",
            disableFilter: true,
            index: 7,
            render: (props: boolean) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Chip
                            label={props ? "Nam" : "Nữ"}
                            color={props ? "secondary" : "primary"}
                        />
                    </Box>
                );
            },
            width: "150",
        },
        {
            field: "role",
            align: "center",
            title: "Phân quyền",
            disableFilter: true,
            index: 8,
            render: (props: Role) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Chip label={props.name} color={props.id === 1 ? "success" : "warning"} />
                    </Box>
                );
            },
            width: "150",
        },
        {
            field: "active",
            align: "center",
            title: "Kích hoạt",
            disableFilter: true,
            index: 9,
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
            width: "150",
        },
        {
            field: "registerTime",
            align: "center",
            title: "Đã đăng kí",
            disableFilter: true,
            index: 10,
            render: (props: string) => {
                return (
                    <Typography align="center">{props ? Util.convertDate(props) : ""}</Typography>
                );
            },
            width: "150",
        },
    ];

    return (
        <React.Fragment>
            <CRUDTable
                title="Quản lí Danh sách tài khoản"
                enableFilter
                sort
                query={`${API_ROOT_URL}/accounts`}
                columns={colums}
            />
        </React.Fragment>
    );
};

export default Accounts;
