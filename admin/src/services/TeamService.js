import apiInstance from "../util/apiConfig";

const create = async (formData) => {
  try {
    const response = await apiInstance.post(`/teams`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Team creation error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create team. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const update = async (dataModel) => {
  try {
    const { id, formData } = dataModel;
    const response = await apiInstance.put(`/teams/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Team update error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update team. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const deleteProperty = async (id) => {
  try {
    const response = await apiInstance.delete(`/teams/${id}`);

    return response;
  } catch (error) {
    console.error("Team deletion error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete team. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(
      `/teams?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Team fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch teams. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error("Team fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch team with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

export { create, update, deleteProperty, fetch, fetchById };
