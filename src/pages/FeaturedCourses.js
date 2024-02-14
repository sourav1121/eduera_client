import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CourseCard from "../components/CourseCard";

function FeaturedCourses() {
  const data = useLoaderData();

  return (
    <div className="bg-gray-100">
      <p className="pt-32 text-gray-400 text-center font-light">
        START TO LEARN?
      </p>
      <h2 className="mt-3 mb-16 text-myblue text-center font-semibold text-4xl">
        Featured Popular Class
      </h2>

      <div className="container mx-auto px-48">
        <div className="grid grid-cols-2 gap-5">
          {data.map((item) => (
            <CourseCard item={item} key={item.courses.id} />
          ))}
        </div>
        <div className="mt-36 pb-28 flex justify-center">
          <Link to="/register">
            <button className="bg-sky-500 hover:bg-myblue transition-all ease-in rounded-l-full px-20 py-4 rounded-tr-full text-white text-lg font-medium">
              Get Started Now <FaArrowRight className="inline" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCourses;
