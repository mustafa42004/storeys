import { API_URL } from "../util/API_URL";
import axios from "axios";

const create = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/news`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const response = await axios.patch(`${API_URL}/news/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const response = await axios.delete(`${API_URL}/news/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    const response = await axios.get(
      `${API_URL}/news?page=${page}&limit=${limit}`
    );
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
    const response = await axios.get(`${API_URL}/news/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
