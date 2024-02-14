import React from "react";

import { useLoaderData } from "react-router-dom";

import CourseCard from "./../components/CourseCard";

function Courses() {
  const data = useLoaderData();

  return (
    <>
      <div className="mx-5 bg-gray-100 rounded-lg p-5 min-w-[80%]">
        <div className="grid grid-cols-2 gap-5">
          {data.map((item) => (
            <CourseCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
