import axios from "../../../axios";
import { TimeFrame } from "../models/TimeFrame.models";

class TimeFrameService {
    getAll(pageOffset: number, limit: number) {
        return axios.get(`/time-frames?limit=${limit}&page-offset=${pageOffset}`);
    }
    getId(id: number) {
        return axios.get(`/time-frames/${id}`);
    }
    create(data: TimeFrame[]) {
        return axios.post(`/time-frames`, data);
    }
    update(data: TimeFrame) {
        return axios.put("/time-frames", data);
    }
    delete(id: number) {
        return axios.delete(`/time-frames/${id}`);
    }
}

export default new TimeFrameService();
