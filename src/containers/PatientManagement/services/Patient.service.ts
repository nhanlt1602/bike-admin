import axios from "../../../axios";
import { Patient } from "../models/Patient.model";

class PatientService {
    get(limit: number, offset: number) {
        return axios.get(`/patients?limit=${limit}&page-offset=${offset}`);
    }

    getBy(searchValue: string) {
        return axios.get(`/patients/${searchValue}`);
    }

    create(data: Patient) {
        return axios.post("/patients", data);
    }

    update(data: Patient) {
        return axios.put("/patients", data);
    }

    delete(id: number) {
        return axios.delete(`/patients/${id}`);
    }
}

export default new PatientService();
