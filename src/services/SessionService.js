import http from "../http-common";

class SessionService {
  getAll() {
    return http.get("/sessions");
  }

  create(data) {
    return http.post("/sessions", data);
  }

  getById(id) {
    return http.get(`/sessions/${id}`);
  }

  update(id, data) {
    return http.post(`/sessions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/sessions/${id}`);
  }

  getbranches(){
    return http.get(`/citybranches`);
  }

  getcoaches(){
    return http.get(`/coaches`);
  }
}

export default new SessionService();
