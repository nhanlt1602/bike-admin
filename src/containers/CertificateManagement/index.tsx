import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import CertificationForm from "./components/CertificationForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Certificate } from "./models/Certificate.models";
import CertificateService from "./services/Certificate.service";

const Certifications: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initDrugType: Certificate = {
        name: "",
        description: "",
    };
    const [data, setData] = useState<Certificate>(initDrugType);
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
            disableSort: true,
        },
        {
            field: "name",
            align: "left",
            title: "Tên chứng nhận",
            index: 2,
        },
        // {
        //     field: "description",
        //     align: "left",
        //     title: "Mô tả chứng nhận",
        //     disableFilter: true,
        //     index: 3,
        // },
    ];

    const addRowData = async (callback: Function) => {
        setOpen(true);
        setData(initDrugType);
        setReload(() => callback);
        // callback();
    };

    const updateRowData = async (rowData: Certificate, callback: Function) => {
        // callback();
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postDrug = async (data: Certificate) => {
        try {
            const response = await CertificateService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const updateDrug = async (data: Certificate) => {
        try {
            const response = await CertificateService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Certificate, clearErrors?: Function) => {
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
        setOpen(false);
    };

    return (
        <React.Fragment>
            <CertificationForm data={data} open={open} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí Chứng nhận Bác sĩ"
                enableFilter
                query={`${API_ROOT_URL}/certifications`}
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

export default Certifications;
