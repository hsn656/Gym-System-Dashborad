import http from "../http-common";

class CoachService {
  getAll() {
    return http.get("/coaches");
  }

  create(data) {
    return http.post("/coaches", data);
  }

  getById(id) {
    return http.get(`/coaches/${id}`);
  }

  update(data, id) {
    return http.put(`/coaches/${id}`, data);
  }

  delete(id) {
    return http.delete(`/coaches/${id}`);
  }

}

export default new CoachService();
