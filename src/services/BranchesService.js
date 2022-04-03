import http from "../http-common";

class BranchesService {
  
  getByCityId(cityId) {
    return http.get(`/branches?city_id=${cityId}`);
  }
}

export default new BranchesService();
