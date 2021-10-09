import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const Doctors: React.FC = () => {
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
            index: 2,
            renderLink: () => {
                return "/doctors";
            },
            width: "230",
        },
        {
            field: "scopeOfPractice",
            align: "left",
            title: "Chuyên khoa",
            index: 3,
            width: "80",
        },
        {
            field: "numberOfConsultants",
            align: "left",
            title: "Số lượng người tư vấn",
            index: 4,
            width: "80",
        },
        {
            field: "rating",
            align: "left",
            title: "Đánh giá",
            index: 5,
            width: "80",
        },
        {
            field: "isVerify",
            align: "left",
            title: "Kích hoạt",
            index: 6,
            render: (props: boolean) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Chip
                            label={props ? "VERIFY" : "NOT VERIFY"}
                            color={props ? "success" : "secondary"}
                        />
                    </Box>
                );
            },
            width: "80",
        },
    ];

    return (
        <React.Fragment>
            <CRUDTable
                title="Quản lí Bác sĩ"
                enableFilter
                sort
                query={`${API_ROOT_URL}/doctors`}
                columns={columns}
            />
        </React.Fragment>
    );
};

export default Doctors;
