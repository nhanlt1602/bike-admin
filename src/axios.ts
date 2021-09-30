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
