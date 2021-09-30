import axios from "axios";

import { API_ROOT_URL } from "./configurations";

export default axios.create({
    baseURL: API_ROOT_URL,
    headers: {
        "Content-type": "application/json",
    },
});
