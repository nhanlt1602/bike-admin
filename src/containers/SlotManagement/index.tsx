import { useCallback, useEffect, useState } from "react";
import React from "react";

import { useParams } from "react-router";
import axios from "src/axios";

import { Slot } from "../PatientManagement/models/Slot.model";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, WeekView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const currentDate = new Date().toDateString();

const SlotManagement: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [slots, setSlots] = useState<Slot[]>([]);
    const loadSlots = useCallback(async () => {
        try {
            const response = await axios.get("/slots?doctor-id=" + id);
            if (response.status === 200) {
                // eslint-disable-next-line no-console
                console.log(response);
                setSlots(response.data?.content || []);
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    }, [id]);

    useEffect(() => {
        loadSlots();
    }, [loadSlots]);

    const Appointment: React.FC = (props: any) => {
        const { children, style, data, ...restProps } = props;
        return (
            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor: data.backgroundColor,
                    color: data.color,
                    fontSize: 12,
                }}
            >
                {children}
            </Appointments.Appointment>
        );
    };

    const getColor = (status: string) => {
        switch (status) {
            case "CANCELED":
                return "red";
            case "COMPLETED":
                return "green";
            case "BOOKED":
                return "orange";
            default:
                return "blue";
        }
    };

    if (slots.length > 0) {
        const data =
            slots?.map((slot) => {
                const year = new Date(slot.assignedDate).getFullYear();
                const month = new Date(slot.assignedDate).getMonth();
                const day = new Date(slot.assignedDate).getDate();
                return {
                    id: slot.id,
                    startDate: new Date(
                        year,
                        month,
                        day,
                        Number(slot.startTime.slice(0, 2)),
                        Number(slot.startTime.slice(3, 2)),
                        0
                    ),
                    endDate: new Date(
                        year,
                        month,
                        day,
                        Number(slot.endTime.slice(0, 2)),
                        Number(slot.endTime.slice(3, 2)),
                        0
                    ),
                    title: slot.healthCheckId ? `${slot.healthCheck?.patient?.name}` : "Lịch trống",
                    location: "",
                    backgroundColor: slot.healthCheckId
                        ? getColor(slot.healthCheck?.status)
                        : grey[400],
                    color: slot.healthCheckId ? "#fff" : "#fff",
                };
            }) || [];
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h5">
                            Lịch khám bệnh của bác sĩ {slots && slots[0]?.doctor.name}
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid padding={1} container border="1px solid grey" borderRadius="15px">
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="grey.400"
                                ></Box>
                                Chưa có lịch
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="orange"
                                ></Box>
                                Đang đợi
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="red"
                                ></Box>
                                Bị hủy
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="green"
                                ></Box>
                                Đã hoàn thành
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box height={20} />
                <Paper>
                    <Scheduler data={data}>
                        <ViewState defaultCurrentDate={currentDate} />
                        <WeekView startDayHour={7} endDayHour={19} cellDuration={60} />
                        <Appointments appointmentComponent={Appointment} />
                    </Scheduler>
                </Paper>
            </React.Fragment>
        );
    }
    return <CircularProgress />;
};

export default SlotManagement;
