import apiInstance from "../util/apiConfig";

const create = async (formData) => {
  try {
    const response = await apiInstance.post(`/properties`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Property creation error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create property. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const update = async (dataModel) => {
  try {
    const { id, formData } = dataModel;
    const response = await apiInstance.patch(`/properties/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Property update error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update property. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const deleteProperty = async (id) => {
  try {
    const response = await apiInstance.delete(`/properties/${id}`);

    return response;
  } catch (error) {
    console.error("Property deletion error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete property. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(
      `/properties?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Property fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch properties. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error("Property fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch property with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

const toggleFeatured = async (id) => {
  try {
    const response = await apiInstance.patch(
      `/properties/toggle-featured/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Property toggle featured error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to toggle featured property. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

export { create, update, deleteProperty, fetch, fetchById, toggleFeatured };
