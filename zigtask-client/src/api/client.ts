import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth-storage") || "{}");
    const token = auth.state?.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An error occurred. Please try again.";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    alert(message);
    return Promise.reject(error);
  }
);

export default apiClient;
