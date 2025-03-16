import apiInstance from "../util/apiConfig";

const create = async (formData) => {
  try {
    const response = await apiInstance.post(`/news`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("News creation error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create news. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const update = async (dataModel) => {
  try {
    const { id, formData } = dataModel;
    const response = await apiInstance.patch(`/news/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("News update error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update news. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const deleteProperty = async (id) => {
  try {
    const response = await apiInstance.delete(`/news/${id}`);

    return response;
  } catch (error) {
    console.error("News deletion error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete news. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(`/news?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("News fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch news. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("News fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch news with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

export { create, update, deleteProperty, fetch, fetchById };
