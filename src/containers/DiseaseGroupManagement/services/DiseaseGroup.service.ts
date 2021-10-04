import axios from "../../../axios";
import { DiseaseGroup } from "../models/DiseaseGroup.model";

class DiseaseGroupService {
    getAll(limit: number, offset: number) {
        return axios.get(`/disease-groups?limit=${limit}&offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/disease-groups/${id}`);
    }

    create(data: DiseaseGroup) {
        return axios.post("/disease-groups", data);
    }

    update(data: DiseaseGroup) {
        return axios.put(`/disease-groups/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete(`/disease-groups/${id}`);
    }
}

export default new DiseaseGroupService();
