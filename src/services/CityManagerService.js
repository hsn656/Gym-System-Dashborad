import http from "../http-common";
import axios from "axios";

class CityManangerService {
  getAll() {
    return http.get("/citymanagers");
  }

  create(data) {
    return http.post("/citymanagers", data);
  }

  getById(id) {
    return http.get(`/citymanagers/${id}`);
  }






  // update(id, data) {
  //   return http.put(`/citymanagers/${id}`, data);
  // }


  // update(id, data) {
  //   return http.put(`/citymanagers/${id}`, data);
  // }
  async update(id, data) {
     await axios.put(`http://localhost:8000/api/citymanagers/${id}`, { hello: 'world' }, {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        'Content-Type':'application/json',
        'name': `${data.name}`,
        'email': `${data.email}`,
        'imageurl': `${data.imageurl}`,
        'nationalid': `${data.nationalid}`,
      }
    })
  };










  delete(id) {
    return http.delete(`/citymanagers/${id}`);
  }
}

export default new CityManangerService();
