import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUserDB, getOneCourseMaterial } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

function CourseMaterial() {
  const { categoryId, courseId } = useParams(); // Get the course ID from the URL
  const [courseMaterial, setCourseMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the course material when the component mounts
    const fetchData = async () => {
      try {
        const data = await getOneCourseMaterial(categoryId, courseId, token);
        setCourseMaterial(data);
        const currentUser = await getCurrentUserDB(user, token);
        // Check if the user is enrolled in the course
        if (!currentUser.enrollments.includes(courseId)) {
          // If not, redirect to the checkout page
          navigate(`/checkout/${categoryId}/${courseId}`);
          return;
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, courseId, navigate, token, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Course Material</h1>
    </div>
  );
}

export default CourseMaterial;
