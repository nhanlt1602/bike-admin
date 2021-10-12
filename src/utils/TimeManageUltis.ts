class TimeManageUltis {
    timeConvert(num: number) {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return `0${hours}`.slice(-2) + ":" + `0${minutes}`.slice(-2) + ":" + `00`;
    }

    convertMinutes(time: string) {
        const array = time.split(":");
        if (array.length == 2) {
            return Number.parseInt(array[0]) * 60 + Number.parseInt(array[1]);
        }
        return 0;
    }
}

export default new TimeManageUltis();
