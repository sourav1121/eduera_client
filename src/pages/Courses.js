import React, { useEffect, useState } from "react";
import CourseCard from "./../components/CourseCard";
import { getAllCourses } from "../services/api";

function Courses() {
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAllCourses()
      .then((data) => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching courses.</div>;
  }

  return (
    <>
      <div className="mx-5 bg-gray-100 rounded-lg p-5 min-w-[80%]">
        <div className="grid grid-cols-2 gap-5">
          {courses.map((item, idx) => (
            <CourseCard item={item} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
