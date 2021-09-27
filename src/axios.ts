import axios from "axios";

export default axios.create({
    baseURL: "http://52.221.193.237/api/v1",
    headers: {
        "Content-type": "application/json",
    },
});
