import http from "../http-common";

class SessionService {
  getAll() {
    return http.get("/sessions");
  }

  getSessionsByBranch(id) {
    return http.get("/sessions?branch_id="+id);
  }

  getOld() {
    return http.get("/oldsessions");
  }

  create(data) {
    return http.post("/sessions", data);
  }

  getById(id) {
    return http.get(`/sessions/${id}`);
  }

  update(data, id) {
    return http.put(`/sessions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/sessions/${id}`);
  }

  getbranches() {
    return http.get(`/branches`);
  }

  getcoaches() {
    return http.get(`/coaches`);
  }
}

export default new SessionService();
