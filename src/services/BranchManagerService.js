import http from "../http-common";

class BranchManangerService {
  getAll() {
    return http.get("/gymmanagers");
  }

  create(data) {
    return http.post("/gymmanagers", data);
  }

  getById(id) {
    return http.get(`/gymmanagers/${id}`);
  }

  update(id, data) {
    return http.post(`/gymmanagers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/gymmanagers/${id}`);
  }
}

export default new BranchManangerService();
