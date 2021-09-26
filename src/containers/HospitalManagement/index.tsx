import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";

import CustomSidebar from "../../components/CustomSidebar";

import { Hospital } from "./models/Hospital.model";
import HospitalService from "./services/Hospital.service";

import { Divider, Grid, Toolbar } from "@mui/material";

function Hospitals() {
    const limit = 20;
    const offset = 1;
    const [loading, setLoading] = useState<boolean>(false);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    const initData = () => {
        HospitalService.getAll(limit, offset).then((response) => {
            setHospitals(response.data.content);
        });
    };

    useEffect(() => {
        initData();
    }, []);

    const onAdd = async (newHospital: Hospital) => {
        setLoading(true);
        await HospitalService.create(newHospital)
            .then((response: any) => {
                console.log(response);
                initData();
            })
            .catch((err: any) => {
                setLoading(false);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onUpdate = async (newHospital: Hospital) => {
        setLoading(true);
        await HospitalService.update(newHospital)
            .then((response: any) => {
                console.log(response);
                initData();
            })
            .catch((err: any) => {
                setLoading(false);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onDelete = async (hospital: Hospital) => {
        setLoading(true);
        await HospitalService.delete(hospital.id)
            .then((response: any) => {
                console.log(response);
                initData();
            })
            .catch((err: any) => {
                setLoading(false);
                console.log(err);
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
            data={hospitals}
            isLoading={loading}
            editable={{
                onRowAdd: (newHospital) => onAdd(newHospital),
                onRowUpdate: (newHospital) => onUpdate(newHospital),
                onRowDelete: (hospital) => onDelete(hospital),
            }}
        ></MaterialTable>
    );

    return (
        <div>
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
        </div>
    );
}

export default Hospitals;
