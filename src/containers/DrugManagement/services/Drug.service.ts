import axios from "../../../axios";
import { Drug } from "../models/Drug.model";

class DrugService {
    get(limit: number, offset: number) {
        return axios.get(`/drugs?limit=${limit}&offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/drugs/${id}`);
    }

    create(data: Drug) {
        return axios.post("/drugs", data);
    }

    update(data: Drug) {
        return axios.put("/drugs", data);
    }

    delete(id: number) {
        return axios.delete(`/drugs/${id}`);
    }
}

export default new DrugService();
