import http from "../http-common";

class BranchService {

  getBranchesByCityId(id) {
    return http.get(`/branches/${id}`);
  }







}

export default new BranchService();
