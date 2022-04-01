import http from "../http-common";

class UsersService {
  getAll() {
    return http.get("/users");
  }

  getSome(page, search) {
    if (!page) page = 1;
    if (!search) search = "";

    return http.get(`/users/paginate?page=${page}&search=${search}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  getById(id) {
    return http.get(`/users/${id}`);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UsersService();
