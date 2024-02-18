import React, { useEffect, useState } from "react";
import CourseCard from "./../components/CourseCard";
import { getAllCategories } from "../services/api";

function Courses() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
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
    return <div>Error occurred while fetching categories.</div>;
  }

  return (
    <>
      <div className="mx-5 bg-gray-100 rounded-lg p-5 min-w-[80%]">
        <div className="grid grid-cols-2 gap-5">
          {categories.map((item, idx) => (
            <CourseCard item={item} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
