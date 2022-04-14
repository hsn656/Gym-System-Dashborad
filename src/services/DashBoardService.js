import http from "../http-common";

class DashBoardService {
  // getMonthlyRevenue() {
  //   return http.get(`/revenue`);
  // }

  getBranches() {
    return http.get("/dashboard/branches");
  }

  getBranchMonthly(branch_id) {
    return http.post("/dashboard/branches/monthly", branch_id);
  }
}

export default new DashBoardService();
