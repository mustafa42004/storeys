import api from "./api";

class propertiesService {
  static async getProperties() {
    const response = await api.get("/properties");
    return response.data;
  }

  static async getPropertyById(id) {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  }
}

export default propertiesService;
