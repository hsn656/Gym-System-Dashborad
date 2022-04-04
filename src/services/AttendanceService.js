import http from "../http-common";

class AttendanceService {
  getAll(branchId) {
    return http.get(`/sheets/${branchId}`);
  }

}

export default new AttendanceService();
