import http from "../http-common";

class BranchesService {
  getByCityId(cityId = 1) {
    return http.get(`/branches?city_id=${cityId}`);
  }

  getSomeByCityId(
    cityId = 1,
    page = 1,
    search = "",
    sortField = "created_at",
    sortDirection = "asc"
  ) {
    if (!cityId) cityId = 1;

    return http.get(
      `/branches/paginate?city_id=${cityId}&page=${page}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
  }
}

export default new BranchesService();
