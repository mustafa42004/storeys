import { API_URL } from "../util/API_URL";
import axios from "axios";

const create = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/teams`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const response = await axios.put(`${API_URL}/teams/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const response = await axios.delete(`${API_URL}/teams/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    const response = await axios.get(
      `${API_URL}/teams?page=${page}&limit=${limit}`
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
    const response = await axios.get(`${API_URL}/teams/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
