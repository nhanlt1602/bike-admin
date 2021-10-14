import axios from "axios";

import { API_ROOT_URL } from "./configurations";
import LocalStorageUtil from "./utils/LocalStorageUtil";

export default axios.create({
    baseURL: API_ROOT_URL,
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
    },
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            LocalStorageUtil.clear();
            window.location.reload();
        }
        return error;
    }
);
