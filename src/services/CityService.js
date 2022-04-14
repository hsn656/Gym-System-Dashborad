import http from "../http-common";

class CityService {
  getAll() {
    return http.get("/cities");
  }

  getNewCities() {
    return http.get("/newcities");
  }

  create(data) {
    return http.post("/cities", data);
  }

  getById(id) {
    return http.get(`/cities/${id}`);
  }

  update(id, data) {
    return http.post(`/cities/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cities/${id}`);
  }
}

export default new CityService();

