import api from "./api";

class propertiesService {
  static async getProperties({ queryKey }) {
    const params = queryKey?.[1];
    const paramKeys = Object.keys(params);

    paramKeys.forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    const response = await api.get("/properties", {
      params: params ? params : {},
    });
    return response.data;
  }

  static async getPropertyById({ queryKey }) {
    const response = await api.get(`/properties/${queryKey[1]}`);
    return response.data;
  }
}

export default propertiesService;
