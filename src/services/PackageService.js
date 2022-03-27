import http from "../http-common";

class PackageService {
  getAll() {
    return http.get("/packages");
  }

  delete(id) {
    return http.delete(`/packages/${id}`);
  }
}

export default new PackageService();
