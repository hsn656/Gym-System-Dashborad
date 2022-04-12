import http from "../http-common";

class BranchesService {
  getByCityId(cityId = null) {
    return http.get(`/branches?city_id=${cityId}`);
  }

  getSomeByCityId(
    cityId = null,
    page = 1,
    search = "",
    sortField = "created_at",
    sortDirection = "asc"
  ) {
    let url = `/branches/paginate?city_id=${cityId}&page=${page}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`;
    return http.get(url);
  }

  getById(id) {
    return http.get(`/branches/${id}`);
  }

  create(data) {
    return http.post("/branches", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  update(id, data) {
    return http.post(`/branches/${id}`, data);
  }

  delete(id) {
    return http.delete(`/branches/${id}`);
  }
}

export default new BranchesService();
