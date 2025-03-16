import apiInstance from "../util/apiConfig";

const create = async (formData) => {
  try {
    const response = await apiInstance.post(`/amenities`, formData);
    return response.data;
  } catch (error) {
    console.error("Amenity creation error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create amenity. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const update = async (dataModel) => {
  try {
    const { id, formData } = dataModel;
    console.log(formData);
    const response = await apiInstance.put(`/amenities/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Amenity update error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update amenity. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const deleteProperty = async (id) => {
  try {
    const response = await apiInstance.delete(`/amenities/${id}`);

    return response;
  } catch (error) {
    console.error("Amenity deletion error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete amenity. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(
      `/amenities?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Amenity fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch amenities. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/amenities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Amenity fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch amenity with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

export { create, update, deleteProperty, fetch, fetchById };
