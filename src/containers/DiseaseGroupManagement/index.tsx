import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import DiseaseGroupForm from "./components";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DiseaseGroup } from "./models/DiseaseGroup.model";
import DiseaseGroupService from "./services/DiseaseGroup.service";

import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const DiseaseGroups: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initDiseaseGroup: DiseaseGroup = {
        groupName: "",
        isActive: true,
    };

    const [data, setData] = useState<DiseaseGroup>(initDiseaseGroup);
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
        {
            field: "groupName",
            align: "left",
            title: "Nhóm dịch bệnh",
            index: 2,
        },
        {
            field: "isActive",
            align: "left",
            title: "Trạng thái",
            disableSort: true,
            disableFilter: true,
            index: 3,
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
        setOpen(true);
        setData(initDiseaseGroup);
        setReload(() => callback);
    };

    const updateRowData = async (rowData: DiseaseGroup, callback: Function) => {
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postDiseaseGroup = async (data: DiseaseGroup) => {
        try {
            const response = await DiseaseGroupService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    const updateDiseaseGroup = async (data: DiseaseGroup) => {
        try {
            const response = await DiseaseGroupService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: DiseaseGroup, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateDiseaseGroup(data);
                } else {
                    postDiseaseGroup(data);
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
            <DiseaseGroupForm data={data} open={open} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí nhóm dịch bệnh"
                enableFilter
                query={`${API_ROOT_URL}/disease-groups`}
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

export default DiseaseGroups;
