import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";

// Student Dashboard
const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    // Fetch the student data when the component mounts
    axios
      .get(`http://localhost:5000/api/user/${user}`)
      .then((response) => {
        console.log(response);
        // Set the enrollments array to the courses state
        setCourses(response.data.enrollments);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  return (
    <div>
      <h1>Student Dashboard</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          {/* Other course details... */}
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
