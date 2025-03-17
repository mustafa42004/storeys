import api from "./api";

class propertiesService {
  static async getProperties({ queryKey }) {
    const response = await api.get("/properties", {
      params: queryKey?.[1] ? queryKey[1] : {},
    });
    return response.data;
  }

  static async getPropertyById(id) {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  }
}

export default propertiesService;
