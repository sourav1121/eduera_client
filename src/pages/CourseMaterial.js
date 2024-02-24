import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUserDB, getOneCourseMaterial } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import ReactPlayer from "react-player";

function CourseMaterial() {
  const { categoryId, courseId } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the course material when the component mounts
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUserDB(user?.uid, token);
        // Check if the user is enrolled in the course
        if (!currentUser.enrollments.includes(courseId)) {
          // If not, redirect to the checkout page
          navigate(`/checkout/${categoryId}/${courseId}`);
          return;
        }
        const data = await getOneCourseMaterial(categoryId, courseId, token);
        setCourse(data);
        setCurrentVideo(data.course_materials[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, courseId, navigate, token, user]);

  if (isLoading || !currentVideo) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>You have to pay first to access course materials!</div>;
  }

  return (
    <div className="flex gap-2">
      <div className="w-full mr-5">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="mb-8">{course.description}</p>
        <ReactPlayer
          url={currentVideo.video_url}
          controls={true}
          width="100%"
        />
      </div>
      <div className="w-1/3 bg-gray-100 p-5">
        {course?.course_materials.map((material, index) => (
          <div
            key={index}
            onClick={() => setCurrentVideo(material)}
            className="cursor-pointer mb-4 hover:bg-white rounded-xl p-5"
          >
            <h2 className="text-xl font-bold">{material.title}</h2>
            <p>{material.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseMaterial;
