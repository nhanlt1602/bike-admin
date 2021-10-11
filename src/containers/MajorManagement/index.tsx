import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import MajorForm from "./components/MajorForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Major } from "./models/Major.model";
import MajorService from "./services/Major.service";

const Majors: React.FC = () => {
    const initMajor: Major = {
        name: "",
        description: "",
    };
    const showSnackbar = useSnackbar();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<Major>(initMajor);
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
            field: "name",
            align: "left",
            title: "Tên Chuyên ngành",
            index: 2,
        },
        // {
        //     field: "description",
        //     align: "left",
        //     title: "Mô tả",
        //     disableFilter: true,
        //     disableSort: true,
        //     index: 3,
        // },
    ];

    const addRowData = async (callback: Function) => {
        setOpen(true);
        setData(initMajor);
        setReload(() => callback);
    };

    const updateRowData = async (rowData: Major, callback: any) => {
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postMajor = async (data: Major) => {
        try {
            const response = await MajorService.create(data);
            if (response.status === 201) {
                reload();
                showSnackbar({
                    children: "Đã thêm một chuyên ngành mới",
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

    const updateMajor = async (data: Major) => {
        try {
            const response = await MajorService.update(data);
            if (response.status === 200) {
                reload();
                showSnackbar({
                    children: "Cập nhật thông tin thành công",
                    variant: "filled",
                    severity: "success",
                });
            }
        } catch (ex) {
            showSnackbar({
                children: "Cập nhật thông tin thất bại",
                variant: "filled",
                severity: "error",
            });
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Major, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateMajor(data);
                } else {
                    postMajor(data);
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
            <MajorForm opened={open} data={data} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí Chuyên ngành"
                enableFilter
                query={`${API_ROOT_URL}/majors`}
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

export default Majors;
