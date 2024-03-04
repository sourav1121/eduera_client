import React, { useState, useEffect, useContext } from "react";
import { deleteCourse, getCurrentUserDB, getMyCourses } from "../services/api";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyCourses(user.uid, token);
        setCourses(data);
        const getUser = await getCurrentUserDB(user.uid, token);
        setCurrentUser(getUser);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  const handleCreateCourse = () => {
    navigate("/createCourse", { state: { course: null } });
  };

  const handleEditCourse = (course) => {
    navigate("/createCourse", { state: { course } });
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const result = await deleteCourse(courseId, token, user?.uid);
      toast(result.message);
      // Remove the deleted course from the local state
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading || !courses) {
    return <h1>...Loading</h1>;
  }

  if (currentUser?.role === "student") {
    return <h1>You must have an Admin account!</h1>;
  }

  return (
    <div className="p-4">
      <button
        className="float-right mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreateCourse}
      >
        Create Course
      </button>
      <table className="w-full shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-2">
                <img
                  src={`http://localhost:5000/${course.photo_url}`}
                  alt={course.title}
                  className="w-24 h-24 object-cover"
                />
              </td>
              <td className="p-2">{course.title}</td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditCourse(course)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
