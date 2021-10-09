import axios from "../../../axios";

import { Doctors } from "src/containers/DoctorDetail/models/Doctor.model";

class DoctorService {
    get(limit: number, offset: number) {
        return axios.get(`/doctors?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/doctors/${id}`);
    }

    create(data: Doctors) {
        return axios.post("/doctors", data);
    }

    update(data: Doctors) {
        return axios.put(`/doctors/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete(`/doctors/${id}`);
    }
}

export default new DoctorService();
