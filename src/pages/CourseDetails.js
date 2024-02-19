import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import { createRef } from "react";
import { useParams } from "react-router-dom/dist";
import { getOneCourse } from "../services/api";

function CourseDetails() {
  const { categoryId, courseId } = useParams();
  const [data, setData] = useState(null);
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const ref = createRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneCourse(categoryId, courseId);
        setData(data);
        setCourse(data[0].courses);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, courseId]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <div>Error occurred while fetching course details.</div>;
  }

  const course_outline = course.course_outline;
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
              <img src={photo_url} alt="" className="" />
            </div>
            <div className="flex-1 p-5">
              <p className="text-3xl mb-4 text-myblue font-bold">${price}</p>
              <Link to={`/checkout/${data._id}/${_id}`}>
                <button className="bg-myblue w-full text-white p-2 mb-2">
                  GET PREMIUM ACCESS
                </button>
              </Link>

              <p className="text-lg font-semibold">This course includes:</p>
              <span>Lessons: {lessons}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5 max-w-[58%] border border-black p-5">
        <h2 className="text-xl mb-3">What you'll learn</h2>
        <ul>
          {course_outline.map((line, idx) => (
            <li key={idx}>
              <BsCheck className="inline" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetails;
