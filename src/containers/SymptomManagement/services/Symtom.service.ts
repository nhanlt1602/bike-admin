import axios from "../../../axios";
import { Symptom } from "../models/Symptom.model";

class SymptomService {
    getAll(limit: number, offset: number) {
        return axios.get(`/symptoms?limit=${limit}&offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/symptoms/${id}`);
    }

    create(data: Symptom) {
        return axios.post("/symptoms", data);
    }

    update(data: Symptom) {
        return axios.put(`/symptoms/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete(`/symptoms/${id}`);
    }
}

export default new SymptomService();
