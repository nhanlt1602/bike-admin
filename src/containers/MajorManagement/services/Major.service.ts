import axios from "../../../axios";
import { Major } from "../models/Major.model";

class MajorService {
    getAll(limit: number, pageOffset: number) {
        return axios.get(`/majors?limit=${limit}&page-offset=${pageOffset}`);
    }

    getId(id: number) {
        return axios.get(`/majors/${id}`);
    }

    create(data: Major) {
        return axios.post("/majors", data);
    }

    update(data: Major) {
        return axios.put("/majors", data);
    }

    delete(id: number) {
        return axios.delete(`/majors/${id}`);
    }
}

export default new MajorService();
