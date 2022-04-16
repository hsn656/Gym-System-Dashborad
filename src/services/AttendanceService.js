import http from "../http-common";

class AttendanceService {
  getAll(branchId) {
    return http.get(`/attendance/${branchId}`);
  }
  getForUser(userId){
    return http.get(`/userattendance/${userId}`);
  }
}

export default new AttendanceService();
