import axios from "../../../axios";
import { Hospital } from "../models/Hospital.model";

class HospitalService {
    getAll(limit: number, offset: number) {
        return axios.get(`/hospitals?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/hospitals/${id}`);
    }

    create(data: Hospital) {
        return axios.post("/hospitals", data);
    }

    update(data: Hospital) {
        return axios.put("/hospitals", data);
    }

    delete(id: number) {
        return axios.delete(`/hospitals/${id}`);
    }
}

export default new HospitalService();
