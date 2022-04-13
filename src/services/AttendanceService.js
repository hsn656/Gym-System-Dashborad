import http from "../http-common";

class AttendanceService {
  getRevenue() {
    return http.get(`statistics/revenue`);
  }
}

export default new AttendanceService();
