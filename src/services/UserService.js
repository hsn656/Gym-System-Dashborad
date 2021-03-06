import http from "../http-common";

class UsersService {
  getAll() {
    return http.get("/users");
  }

  getSome(
    page = 1,
    search = "",
    sortField = "created_at",
    sortDirection = "asc"
  ) {
    return http.get(
      `/users/paginate?page=${page}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
  }

  create(data) {
    return http.post("/users", data);
  }

  getById(id) {
    return http.get(`/users/${id}`);
  }

  getSomeByEmail(email) {
    return http.get(`/users/paginate/email?search=${email}`);
  }

  update(id, data) {
    return http.post(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  getBranchUsers(id) {
    return http.get(`/users/branch/${id}`);
  }
}

export default new UsersService();
