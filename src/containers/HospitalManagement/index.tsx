import React, { useState } from "react";

import MaterialTable from "material-table";

import CustomSidebar from "../../components/CustomSidebar";

import { Hospital } from "./models/Hospital.model";
import HospitalService from "./services/Hospital.service";

import { Divider, Grid, Toolbar } from "@mui/material";

const Hospitals: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onAdd = async (newHospital: Hospital) => {
        setLoading(true);
        await HospitalService.create(newHospital)
            .then(() => {
                // initData()
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onUpdate = async (newHospital: Hospital) => {
        setLoading(true);
        await HospitalService.update(newHospital)
            .then(() => {
                // initData();
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onDelete = async (hospital: Hospital) => {
        setLoading(true);
        await HospitalService.delete(hospital.id)
            .then(() => {
                // initData();
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        { title: "Mã", field: "hospitalCode" },
        { title: "Tên bệnh viện", field: "name" },
        { title: "Địa chỉ", field: "address" },
        { title: "Thông tin chi tiết", field: "description" },
    ];

    const table = (
        <MaterialTable
            title="Hospitals List"
            columns={columns}
            data={(query) =>
                new Promise((resolve, _reject) => {
                    HospitalService.getAll(query.pageSize, query.page + 1).then((response) => {
                        resolve({
                            data: response.data.content,
                            page: response.data.currentPage - 1,
                            totalCount: response.data.totalCount,
                        });
                    });
                })
            }
            isLoading={loading}
            editable={{
                onRowAdd: (newHospital: Hospital) => onAdd(newHospital),
                onRowUpdate: (newHospital: Hospital) => onUpdate(newHospital),
                onRowDelete: (hospital: Hospital) => onDelete(hospital),
            }}
        ></MaterialTable>
    );

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CustomSidebar />
                </Grid>
                <Grid item xs={8}>
                    <Toolbar />
                    <Divider />
                    {table}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Hospitals;
