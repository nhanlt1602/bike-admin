import useSnackbar from "src/components/Snackbar/useSnackbar";

import { TimeFrame } from "src/containers/TimeFrame/models/TimeFrame.models";
import TimeFrameService from "src/containers/TimeFrame/services/TimeFrame.service";

let timeFrameList: TimeFrame[] = [];

const useGenerateTimeFrame = () => {
    const showSnackbar = useSnackbar();
    const time_convert = (num: number) => {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `0${hours}`.slice(-2) + ":" + `0${minutes}`.slice(-2) + ":" + `00`;
    };

    const convert_minutes = (time: string) => {
        var a = time.split(":");
        return +a[0] * 60 + +a[1];
    };

    const handleGenerateTimeFrame = (startTime: string, endTime: string, rangeTime: string) => {
        let startTimeNumber = startTime != undefined ? convert_minutes(startTime) : 0;
        let endTimeNumber = endTime != undefined ? convert_minutes(endTime) : 0;
        let rangeTimeNumber = Number.parseInt(rangeTime);
        if (
            startTimeNumber > 0 &&
            endTimeNumber > 0 &&
            endTimeNumber > startTimeNumber &&
            rangeTimeNumber > 10
        ) {
            let start = startTimeNumber;
            timeFrameList = [];
            while (start + rangeTimeNumber <= endTimeNumber) {
                timeFrameList.push({
                    startTime: time_convert(start),
                    endTime: time_convert(start + rangeTimeNumber),
                });
                start += rangeTimeNumber;
            }
            if (timeFrameList.length != 0) {
                timeFrameList = timeFrameList.reverse();
                createTimeFrames();
            }
        }
    };

    const createTimeFrames = async () => {
        if (timeFrameList != null && timeFrameList.length > 0) {
            await TimeFrameService.create(timeFrameList)
                .then((res) => {
                    if (res.status === 200) {
                        showSnackbar({
                            children: "Thêm mới thành công",
                            variant: "filled",
                            severity: "success",
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                })
                .catch(() => {
                    showSnackbar({
                        children: "Thêm mới thất bại",
                        variant: "filled",
                        severity: "error",
                    });
                });
        }
    };
    return { handleGenerateTimeFrame };
};

export default useGenerateTimeFrame;
