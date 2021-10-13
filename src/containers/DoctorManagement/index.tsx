import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Doctor } from "../PatientManagement/models/Doctor.model";

import { Avatar, Rating, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

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
        width: "90",
    },
    {
        field: "name",
        align: "left",
        title: "Tên bác sĩ",
        index: 4,
        width: "130",
    },
    {
        field: "certificateCode",
        align: "left",
        title: "Mã hành nghề",
        index: 5,
        width: "150",
    },
    {
        field: "scopeOfPractice",
        align: "left",
        title: "Chuyên khoa",
        index: 6,
        width: "190",
    },
    {
        field: "numberOfConsultants",
        align: "left",
        title: "Số người tư vấn",
        index: 7,
        width: "160",
    },
    {
        field: "rating",
        align: "left",
        title: "Đánh giá",
        index: 8,
        width: "90",
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bác sĩ đã xác nhận" />
                        <Tab label="Bác sĩ chưa xác nhận" />
                        <Tab label="Bác sĩ đã từ chối" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CRUDTable
                        title={
                            window.location.href.includes("verify")
                                ? "Danh sách bác sĩ đã xác nhận"
                                : "Danh sách bác sĩ đã xác nhận"
                        }
                        enableFilter
                        sort
                        query={`${API_ROOT_URL}/doctors`}
                        initParam={`&is-verify=${
                            window.location.href.includes("verify") ? "-2" : "1"
                        }&`}
                        columns={
                            window.location.href.includes("verify") ? verifyColumns : normalColumns
                        }
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CRUDTable
                        title={
                            window.location.href.includes("verify")
                                ? "Danh sách bác sĩ chưa xác nhận"
                                : "Danh sách bác sĩ chưa xác nhận"
                        }
                        enableFilter
                        sort
                        query={`${API_ROOT_URL}/doctors`}
                        initParam={`&is-verify=${
                            window.location.href.includes("verify") ? "-2" : "-2"
                        }&`}
                        columns={
                            window.location.href.includes("verify") ? verifyColumns : verifyColumns
                        }
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CRUDTable
                        title={
                            window.location.href.includes("verify")
                                ? "Danh sách bác sĩ đã từ chối"
                                : "Danh sách bác sĩ đã từ chối"
                        }
                        enableFilter
                        sort
                        query={`${API_ROOT_URL}/doctors`}
                        initParam={`&is-verify=${
                            window.location.href.includes("verify") ? "-1" : "-1"
                        }&`}
                        columns={
                            window.location.href.includes("verify") ? verifyColumns : verifyColumns
                        }
                    />
                </TabPanel>
            </Box>
        </React.Fragment>
    );
};

export default Doctors;
