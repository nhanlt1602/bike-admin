import { useCallback, useEffect, useState } from "react";
import React from "react";

import { useParams } from "react-router";
import axios from "src/axios";

import { Slot } from "../PatientManagement/models/Slot.model";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, WeekView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { CircularProgress, Paper } from "@mui/material";

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
                        : "blue",
                };
            }) || [];
        return (
            <React.Fragment>
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
