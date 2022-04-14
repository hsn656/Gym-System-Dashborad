import http from "../http-common";

class ButPackageService {
  create(data) {
    return http.post("/packages/buyToUser", data);
  }
}

export default new ButPackageService();
