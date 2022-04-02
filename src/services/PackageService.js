import http from "../http-common";

class PackageService {
  getAll() {
    return http.get("/packages");
  }

  delete(id) {
    return http.delete(`/packages/${id}`);
  }

  create(data) {
    return http.post("/packages", data);
  }

  update(id, data) {
    return http.post(`/packages/${id}`, data);
  }
}

export default new PackageService();
