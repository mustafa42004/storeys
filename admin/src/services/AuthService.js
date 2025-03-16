import apiInstance from "../util/apiConfig";

const signin = async (formData) => {
  try {
    const response = await apiInstance.post(`/auth/login`, formData);
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
    const response = await apiInstance.patch(`/auth/change-password`, formData);
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
