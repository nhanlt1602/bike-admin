class TimeManageUltis {
    timeConvert(num: number) {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return `0${hours}`.slice(-2) + ":" + `0${minutes}`.slice(-2) + ":" + `00`;
    }

    convertMinutes(time: string) {
        const array = time.split(":");
        if (array.length == 2 && Number.isInteger(array[0]) && Number.isInteger(array[1])) {
            return +array[0] * 60 + +array[1];
        }
        return 0;
    }
}

export default new TimeManageUltis();
