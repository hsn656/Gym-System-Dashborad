import http from "../http-common";
import axios from "axios";

class CityService {
  getAll() {
    return http.get("/cities");
  }

  create(data) {
    return http.post("/cities", data);
  }

  getById(id) {
    return http.get(`/cities/${id}`);
  }






  // update(id, data) {
  //   return http.put(`/citymanagers/${id}`, data);
  // }


  // update(id, data) {
  //   return http.put(`/citymanagers/${id}`, data);
  // }
  async update(id, data) {
     await axios.put(`http://localhost:8000/api/cities/${id}`, { hello: 'world' }, {
      headers: {
        'Content-Type':'application/json',
        'name': `${data.name}`,
        'managerId': `${data.manager_id}`,
      }
    })
  };










  delete(id) {
    return http.delete(`/cities/${id}`);
  }
}

export default new CityService();
