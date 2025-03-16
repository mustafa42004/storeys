import { API_URL } from "../util/API_URL";
import axios from "axios";

const signin = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to sign in. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

const changePassword = async (formData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/auth/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to change password. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};

export { signin, changePassword };
