import { API_URL } from "../util/API_URL";
import axios from "axios";

const create = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/amenities`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
    const response = await axios.put(`${API_URL}/amenities/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
    const response = await axios.delete(`${API_URL}/amenities/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    const response = await axios.get(
      `${API_URL}/amenities?page=${page}&limit=${limit}`
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
    const response = await axios.get(`${API_URL}/amenities/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
