import axios from "../../../axios";
import { Disease } from "../models/Disease.model";

class DiseaseService {
    getAll(limit: number, offset: number) {
        return axios.get(`/diseases?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/diseases/${id}`);
    }

    create(data: Disease) {
        return axios.post("/diseases", data);
    }

    update(data: Disease) {
        return axios.put("/diseases", data);
    }

    delete(id: number) {
        return axios.delete(`/diseases/${id}`);
    }
}

export default new DiseaseService();
