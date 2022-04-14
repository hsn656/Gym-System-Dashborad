import http from "../http-common";

class StatisticsService {
  getRevenue() {
    return http.get(`/statistics/revenue`);
  }
}

export default new StatisticsService();
