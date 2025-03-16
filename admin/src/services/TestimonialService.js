import { API_URL } from "../util/API_URL";
import axios from "axios";

const create = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/testimonials`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const response = await axios.patch(
      `${API_URL}/testimonials/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
    const response = await axios.delete(`${API_URL}/testimonials/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    const response = await axios.get(
      `${API_URL}/testimonials?page=${page}&limit=${limit}`
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
    const response = await axios.get(`${API_URL}/testimonials/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
