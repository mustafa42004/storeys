import apiInstance from "../util/apiConfig";

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(
      `/careers?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Career fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch career. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/careers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Career fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch Career with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

export { fetch, fetchById };
