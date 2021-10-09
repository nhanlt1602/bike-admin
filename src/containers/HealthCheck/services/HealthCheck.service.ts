import axios from "../../../axios";
import { HealthCheck } from "../models/HealthCheck.model";

class HealthCheckService {
    get(limit: number, offset: number) {
        return axios.get(`/health-checks?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/health-checks/${id}`);
    }

    create(data: HealthCheck) {
        return axios.post("/health-checks", data);
    }

    update(data: HealthCheck) {
        return axios.put(`/health-checks/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete(`/health-checks/${id}`);
    }
}

export default new HealthCheckService();
