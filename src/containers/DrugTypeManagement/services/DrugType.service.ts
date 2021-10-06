import axios from "../../../axios";
import { DrugType } from "../models/DrugType.models";

class DrugTypeService {
    get(limit: number, offset: number) {
        return axios.get(`/drug-types?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/drug-types/${id}`);
    }

    create(data: DrugType) {
        return axios.post("/drug-types", data);
    }

    update(data: DrugType) {
        return axios.put("/drug-types", data);
    }

    delete(id: number) {
        return axios.delete(`/drug-types/${id}`);
    }
}

export default new DrugTypeService();
