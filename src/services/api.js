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
const getAllCourses = async () => {
  try {
    const response = await axios.get(`${baseUrl}/courses`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getCoursesByCategory = async (catId) => {
  try {
    const response = await axios.get(`${baseUrl}/courses/category/${catId}`);
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

const getOneCourseMaterial = async (catid, crsid, token) => {
  try {
    const response = await axios.get(
      `${baseUrl}/courses/${catid}/${crsid}/view`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createCheckoutSession = async (catid, crsid, userid, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/checkout_sessions/`,
      {
        categoryId: catid,
        courseId: crsid,
        userId: userid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const createCourse = async (course, token) => {
  console.log(course);
  try {
    const response = await axios.post(`${baseUrl}/courses`, course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateCourse = async (course, token, courseId) => {
  console.log(course);
  try {
    const response = await axios.put(`${baseUrl}/courses/${courseId}`, course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCourse = async (courseId, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// My API
const getMyCourses = async (userId, token) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${userId}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserDB = async (userId, token) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${userId}`, {
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
  getAllCourses,
  getCoursesByCategory,
  getOneCourse,
  getMyCourses,
  getOneCourseMaterial,
  createCheckoutSession,
  getCurrentUserDB,
  getAllCategories,
  createCourse,
  updateCourse,
  deleteCourse,
};
