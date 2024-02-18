import axios from "axios";

const baseUrl = "http://localhost:5000/api";

// Auth API
const login = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const signup = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/user/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Public API
const getAllCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/courses`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getOneCategory = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getOneCourse = async (catid, crsid) => {
  try {
    const response = await axios.get(`${baseUrl}/courses/${catid}/${crsid}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// My API
const getMyData = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  login,
  signup,
  getAllCategories,
  getOneCategory,
  getOneCourse,
  getMyData,
};
