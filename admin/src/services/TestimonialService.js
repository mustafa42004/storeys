import apiInstance from "../util/apiConfig";

const create = async (formData) => {
  try {
    const response = await apiInstance.post(`/testimonials`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Testimonial creation error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create testimonial. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const update = async (dataModel) => {
  try {
    const { id, formData } = dataModel;
    const response = await apiInstance.patch(`/testimonials/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Testimonial update error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update testimonial. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const deleteProperty = async (id) => {
  try {
    const response = await apiInstance.delete(`/testimonials/${id}`);

    return response;
  } catch (error) {
    console.error("Testimonial deletion error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete testimonial. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetch = async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get(
      `/testimonials?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Testimonial fetch error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch testimonials. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const fetchById = async (id) => {
  try {
    const response = await apiInstance.get(`/testimonials/${id}`);
    return response.data;
  } catch (error) {
    console.error("Testimonial fetch by ID error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Failed to fetch testimonial with ID ${id}. Please try again.`,
      error: error.response?.data || error.message,
    };
  }
};

export { create, update, deleteProperty, fetch, fetchById };
