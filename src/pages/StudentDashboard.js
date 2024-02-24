import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { getCurrentUserDB } from "../services/api";
import axios from "axios";

// Student Dashboard
const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      // Fetch the user data from your backend
      const user1 = await getCurrentUserDB(user.uid, token);
      // Fetch the details of each course the user is enrolled in
      if (user1) {
        const coursePromises = user1.enrollments.map((courseId) =>
          axios
            .get(`http://localhost:5000/api/courses/${courseId}`)
            .then((res) => res.data)
        );
        const courses = await Promise.all(coursePromises);

        setCourses(courses);
      }
      setLoading(false);
    };

    fetchEnrollments();
  }, [token, user]);

  if (loading) {
    return <h1>...Loading</h1>;
  }

  if (courses.length <= 0) {
    return <h1>You are not enrolled in any course yet!</h1>;
  }

  return (
    <div className="flex flex-col">
      {courses.map((course) => (
        <div
          key={course._id}
          className="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 object-cover"
              src={course.photo_url}
              alt={course.title}
            />
            <span className="font-bold text-lg">{course.title}</span>
          </div>
          <Link to={`/courses/${course.category_id}/${course._id}/view`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to Course
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
