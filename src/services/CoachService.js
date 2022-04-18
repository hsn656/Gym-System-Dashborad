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
    return http.post(`/coaches/${id}`, data);
  }

  delete(id) {
    return http.delete(`/coaches/${id}`);
  }

  getSome(
    page = 1,
    search = "",
    sortField = "name",
    sortDirection = "asc"
  ) {
    return http.get(
      `/coaches/paginate?page=${page}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
  }
}

export default new CoachService();
