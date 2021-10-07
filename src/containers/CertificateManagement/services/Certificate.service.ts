import axios from "../../../axios";
import { Certificate } from "../models/Certificate.models";

class CertificateService {
    get(limit: number, offset: number) {
        return axios.get(`/certifications?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/certifications/${id}`);
    }

    create(data: Certificate) {
        return axios.post("/certifications", data);
    }

    update(data: Certificate) {
        return axios.put("/certifications", data);
    }

    delete(id: number) {
        return axios.delete(`/certifications/${id}`);
    }
}

export default new CertificateService();
