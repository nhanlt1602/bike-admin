import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import DrugForm from "./components/DrugForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { DrugType } from "../DrugTypeManagement/models/DrugType.models";
import { Drug } from "./models/Drug.model";
import DrugService from "./services/Drug.service";

import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const Drugs: React.FC = () => {
    const initData: Drug = {
        name: "",
        producer: "",
        drugOrigin: "",
        drugForm: "",
        drugTypeId: 0,
        isActive: true,
    };

    const showSnackbar = useSnackbar();
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [data, setData] = useState<Drug>(initData);
    const [reload, setReload] = useState<Function>(() => {});

    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        { field: "name", align: "left", title: "Tên thuốc", index: 2 },
        { field: "producer", align: "left", title: "Nhà sản xuất", index: 3 },
        { field: "drugOrigin", align: "left", title: "Xuất xứ", index: 4, width: "100" },
        { field: "drugForm", align: "left", title: "Định dạng", index: 5, width: "100" },
        {
            field: "drugType",
            align: "left",
            title: "Tên loại thuốc",
            disableFilter: true,
            index: 6,
            render: (props: DrugType) => {
                return <React.Fragment>{props.name}</React.Fragment>;
            },
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
                            label={props ? "Active" : "Inactive"}
                            color={props ? "success" : "default"}
                        />
                    </Box>
                );
            },
            width: "100",
        },
    ];

    const addRowData = async (callback: Function) => {
        setIsOpenForm(true);
        setData(initData);
        setReload(() => callback);
    };

    const updateRowData = async (rowData: Drug, callback: Function) => {
        setIsOpenForm(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postDrug = async (data: Drug) => {
        try {
            const response = await DrugService.create(data);
            if (response.status === 201) {
                reload();
                showSnackbar({
                    children: "Đã thêm một loại thuốc mới",
                    variant: "filled",
                    severity: "success",
                });
            }
        } catch (_ex) {
            showSnackbar({
                children: "Có lỗi xảy ra. Thêm mới thất bại",
                variant: "filled",
                severity: "error",
            });
        }
    };

    const updateDrug = async (data: Drug) => {
        try {
            const response = await DrugService.update(data);
            if (response.status === 200) {
                reload();
                showSnackbar({
                    children: "Cập nhật thông tin thành công",
                    variant: "filled",
                    severity: "success",
                });
            }
        } catch (_ex) {
            showSnackbar({
                children: "Cập nhật thất bại",
                variant: "filled",
                severity: "error",
            });
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Drug, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateDrug(data);
                } else {
                    postDrug(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setIsOpenForm(false);
    };

    return (
        <React.Fragment>
            <DrugForm opened={isOpenForm} data={data} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí Thuốc"
                enableFilter
                query={`${API_ROOT_URL}/drugs`}
                columns={colums}
                action={{
                    onAdd: (callback) => addRowData(callback),
                    onDelete: true,
                    onEdit: (rowData, callback) => updateRowData(rowData, callback),
                }}
            />
        </React.Fragment>
    );
};

export default Drugs;
