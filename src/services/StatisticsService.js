import http from "../http-common";

class StatisticsService {
  getRevenue() {
    return http.get(`/statistics/revenue`);
  }

  getTopUsers(city_id = "all", branch_id = "all") {
    return http.get(
      `/statistics/top-users?city=${city_id}&branch=${branch_id}`
    );
  }
}

export default new StatisticsService();
