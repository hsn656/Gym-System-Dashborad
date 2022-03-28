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
}

export default new PackageService();
