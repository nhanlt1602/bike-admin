import useSnackbar from "src/components/Snackbar/useSnackbar";

import { TimeFrame } from "src/containers/TimeFrame/models/TimeFrame.models";
import TimeFrameService from "src/containers/TimeFrame/services/TimeFrame.service";
import TimeManageUltis from "src/utils/TimeManageUltis";

let timeFrameList: TimeFrame[] = [];

export type GenerateTimeFrame = {
    handleGenerateTimeFrame: (startTime: string, endTime: string, rangeTime: string) => void;
};

const useGenerateTimeFrame = () => {
    const showSnackbar = useSnackbar();

    const handleGenerateTimeFrame = (startTime: string, endTime: string, rangeTime: string) => {
        const startTimeNumber =
            startTime != undefined ? TimeManageUltis.convertMinutes(startTime) : 0;
        const endTimeNumber = endTime != undefined ? TimeManageUltis.convertMinutes(endTime) : 0;
        const rangeTimeNumber = Number.parseInt(rangeTime);
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
                    startTime: TimeManageUltis.timeConvert(start),
                    endTime: TimeManageUltis.timeConvert(start + rangeTimeNumber),
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
