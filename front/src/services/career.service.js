import api from "./api";

class CareerService {
  static async createCareer(career) {
    const response = await api.post("/careers", career);
    return response.data;
  }
}

export default CareerService;
