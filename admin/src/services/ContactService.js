import apiInstance from "../util/apiConfig";

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(
      `/contacts?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Contact fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch contacts. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Contact fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch contact with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

export { fetch, fetchById };
