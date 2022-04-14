import http from "../http-common";

class CityManangerService {
  getAll() {
    return http.get("/citymanagers");
  }

  create(data) {
    return http.post("/citymanagers", data);
  }

  getById(id) {
    return http.get(`/citymanagers/${id}`);
  }

  update(id, data) {
    return http.post(`/citymanagers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/citymanagers/${id}`);
  }
}

export default new CityManangerService();
