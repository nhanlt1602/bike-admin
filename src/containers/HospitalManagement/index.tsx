import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import HospitalForm from "./components/HospitalForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Hospital } from "./models/Hospital.model";
import HospitalService from "./services/Hospital.service";

import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const Hospitals: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initHospital: Hospital = {
        hospitalCode: "",
        name: "",
        address: "",
        description: "",
        isActive: true,
    };
    const [data, setData] = useState<Hospital>(initHospital);
    const [reload, setReload] = useState<Function>(() => {});
    const colums: IColumn[] = [
        {
            field: "stt",
            align: "left",
            title: "STT",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
            disableSort: true,
        },
        {
            field: "hospitalCode",
            align: "left",
            title: "Mã Bệnh Viện",
            index: 2,
        },
        {
            field: "name",
            align: "left",
            title: "Tên Bệnh viện",
            index: 3,
        },
        {
            field: "address",
            align: "left",
            title: "Địa chỉ",
            index: 4,
        },
        {
            field: "isActive",
            align: "left",
            title: "Trạng thái",
            disableSort: true,
            disableFilter: true,
            index: 5,
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
        //     field: "description",
        //     align: "left",
        //     title: "Mô tả",
        //     disableFilter: true,
        //     disableSort: true,
        //     index: 5,
        //     // render: (props: string) => {
        //     //     return <div style={{ backgroundColor: "red" }}>{props}</div>;
        //     // },
        // },
    ];

    const addRowData = async (callback: Function) => {
        setOpen(true);
        setData(initHospital);
        setReload(() => callback);
    };

    const updateRowData = async (rowData: Hospital, callback: Function) => {
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postHospital = async (data: Hospital) => {
        try {
            const response = await HospitalService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const updateHospital = async (data: Hospital) => {
        try {
            const response = await HospitalService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Hospital, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateHospital(data);
                } else {
                    postHospital(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <HospitalForm opened={open} data={data} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí Bệnh Viện"
                enableFilter
                query={`${API_ROOT_URL}/hospitals`}
                columns={colums}
                sort
                action={{
                    onAdd: (callback) => addRowData(callback),
                    onDelete: true,
                    onEdit: (rowData, callback) => updateRowData(rowData, callback),
                }}
            />
        </React.Fragment>
    );
};

export default Hospitals;
