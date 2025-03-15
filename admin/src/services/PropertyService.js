import { API_URL } from "../util/API_URL";
import axios from "axios";

const create = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/properties`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const response = await axios.patch(
      `${API_URL}/properties/${id}`,
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
    const response = await axios.delete(`${API_URL}/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    const response = await axios.get(
      `${API_URL}/properties?page=${page}&limit=${limit}`
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
    const response = await axios.get(`${API_URL}/properties/${id}`);
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

export { create, update, deleteProperty, fetch, fetchById };
