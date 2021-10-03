class Util {
    convertDate(input: string) {
        let date = input?.slice(0, 10);
        const [year, month, day] = date?.split("-");
        date = day + "/" + month + "/" + year;
        return date;
    }
}

export default new Util();
