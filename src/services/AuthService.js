import http from "../http-common";

class AuthService {
  login(email, password) {
    return http.post("/auth/login", { email, password });
  }
}

export default new AuthService();
