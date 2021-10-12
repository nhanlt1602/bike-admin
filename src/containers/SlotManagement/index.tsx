import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, WeekView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { Paper } from "@mui/material";

const currentDate = new Date().toDateString();

export default () => (
    <Paper>
        <Scheduler>
            <ViewState defaultCurrentDate={currentDate} />
            <WeekView startDayHour={7} endDayHour={19} cellDuration={90} />
            <Appointments />
        </Scheduler>
    </Paper>
);
