import axios from "../../../axios";
import { Account } from "../models/Account.model";

class AccountService {
    get(limit: number, offset: number) {
        return axios.get(`/accounts?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/accounts/${id}`);
    }

    create(data: Account) {
        return axios.post("/accounts", data);
    }

    update(data: Account) {
        return axios.put("/accounts", data);
    }

    delete(id: number) {
        return axios.delete(`/accounts/${id}`);
    }
}

export default new AccountService();
