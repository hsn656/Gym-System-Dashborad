import http from "../http-common";

class StatisticsService {
  getRevenue() {
    return http.get(`/statistics/revenue`);
  }

  getTopUsers(city_id = "all", branch_id = "all") {
    return http.get(
      `/statistics/top-users?city_id=${city_id}&branch_id=${branch_id}`
    );
  }
}

export default new StatisticsService();
