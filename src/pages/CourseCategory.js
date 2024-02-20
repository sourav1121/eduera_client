import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useParams } from "react-router-dom/dist";
import { getCoursesByCategory } from "../services/api";

function CourseCategory() {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoursesByCategory(categoryId);
        setCourses(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <div>Error occurred while fetching category details.</div>;
  }
  return (
    <div className="mx-5 bg-gray-100 rounded-lg p-5 min-w-[80%]">
      <div className="grid grid-cols-2 gap-5">
        {courses.map((item, idx) => (
          <CourseCard item={item} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default CourseCategory;
