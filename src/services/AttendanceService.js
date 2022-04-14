import http from "../http-common";

class AttendanceService {
  getAll(branchId) {
    return http.get(`/attendance/${branchId}`);
  getRevenue() {
    return http.get(`statistics/revenue`);
  }
}

export default new AttendanceService();
