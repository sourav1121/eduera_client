import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import { createRef } from "react";
import { useParams } from "react-router-dom/dist";
import { getCurrentUserDB, getOneCourse } from "../services/api";
import { AuthContext } from "../contexts/AuthProvider";
import ReactPlayer from "react-player";

function CourseDetails() {
  const { categoryId, courseId } = useParams();
  const [course, setCourse] = useState({
    _id: "",
    category_id: "",
    title: "",
    photo_url: "",
    description: "",
    price: "",
    lessons: "",
    students: "",
    course_outline: [],
    course_materials: [
      {
        title: "",
        description: "",
        video_url: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const ref = createRef();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneCourse(categoryId, courseId);
        setCourse(data);
        const getUser = await getCurrentUserDB(user?.uid, token);
        setCurrentUser(getUser);
        // Check if the user is enrolled in the course
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, courseId, token, user]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <div>Error occurred while fetching course details.</div>;
  }

  const { _id, title, photo_url, description, price, lessons, students } =
    course;

  return (
    <div className="flex flex-col" ref={ref}>
      <div className="mx-5 relative bg-[#1c1d1f] rounded-lg p-5 min-w-[80%] max-h-[232px]">
        <div className="w-[50%] p-2 text-white">
          <h2 className="text-2xl mb-2">{title}</h2>
          <p className="text-xl ">{description}</p>
        </div>
        <div className="absolute top-[10%] right-[10%] bg-white w-[300px] h-[600px] shadow-md border border-white">
          <div className="flex flex-col">
            <div className="flex-1">
              <img
                src={`http://localhost:5000/${photo_url}`}
                alt=""
                className=""
              />
            </div>
            <div className="flex-1 p-5">
              <p className="text-3xl mb-4 text-myblue font-bold">${price}</p>
              {currentUser && currentUser?.enrollments.includes(courseId) ? (
                <Link to={`/courses/${course.category_id}/${_id}/view`}>
                  <button className="bg-myblue w-full text-white p-2 mb-2">
                    GO TO COURSE
                  </button>
                </Link>
              ) : (
                <Link to={`/checkout/${course.category_id}/${_id}`}>
                  <button className="bg-myblue w-full text-white p-2 mb-2">
                    GET PREMIUM ACCESS
                  </button>
                </Link>
              )}

              <p className="text-lg font-semibold">This course includes:</p>
              <span>Lessons: {lessons}</span>
              <br />
              <span>Students: {students}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5 max-w-[58%] border border-black p-5">
        <h2 className="text-xl mb-3">What you'll learn</h2>
        <ul>
          {course?.course_outline?.map((line, idx) => (
            <li key={idx}>
              <BsCheck className="inline" />
              {line}
            </li>
          ))}
        </ul>
        <ReactPlayer
          url={course?.course_materials[0].video_url}
          controls={true}
          width="100%"
          className="mt-8"
          playing={true}
          muted={true}
        />
      </div>
    </div>
  );
}

export default CourseDetails;
