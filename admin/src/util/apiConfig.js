import axios from "axios";
import { API_URL } from "./API_URL";

// Create an Axios instance with a base URL and other default configurations
const apiInstance = axios.create({
  baseURL: API_URL, // Set your API base URL here
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Modify the request before it is sent
apiInstance.interceptors.request.use(
  (config) => {
    // Example: Add Authorization token to headers if it exists
    const token = localStorage.getItem("token"); // Get token from localStorage or other storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the headers
    }
    console.log("Request:", config); // Log the request config for debugging
    return config; // Return the modified config
  },
  (error) => {
    // Handle any request errors globally
    console.error("Request Error:", error);
    return Promise.reject(error); // Reject the promise if there's an error
  }
);

// Response interceptor: Modify or handle the response before it's passed to `.then()`
apiInstance.interceptors.response.use(
  (response) => {
    // Example: Check the response data
    console.log("Response:", response); // Log the response for debugging
    return response; // Return the response object
  },
  (error) => {
    // Handle any response errors globally (like logging out on 401 error)
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 500)
    ) {
      console.log("Unauthorized access, please login!");
      localStorage.removeItem("token");
      // You can add logic here, e.g., redirect to login page or clear user data
    }
    console.error("Response Error:", error);
    return Promise.reject(error); // Reject the error to be caught by `.catch()`
  }
);

export default apiInstance;
