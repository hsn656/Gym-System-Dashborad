import http from "../http-common";

class AttendanceService {
  getAll(branchId) {
    return http.get(`/attendance/${branchId}`);
  }

}

export default new AttendanceService();
