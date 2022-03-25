import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/users");
  }

  create(data) {
    return http.post("/users", data);
  }

  getById(id) {
    return http.get(`/users/${id}`);
  }

  update(id, data) {
    return http.post(`/users/${id}`, data);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new TutorialDataService();
