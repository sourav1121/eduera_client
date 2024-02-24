import React from "react";
import { CgProfile } from "react-icons/cg";
import { BiSpreadsheet } from "react-icons/bi";
import { Link } from "react-router-dom";

function CourseCard({ item }) {
  return (
    <>
      <Link to={`/courses/${item.category_id}/${item?._id}`}>
        <div className="flex px-5 pt-6 pb-10 rounded-lg hover:bg-white">
          <img
            src={`http://localhost:5000/${item?.photo_url}`}
            alt=""
            className="w-40 h-40 rounded-full p-2"
          />
          <div className="ml-5 flex flex-col gap-5">
            <h2 className="text-xl text-myblue font-medium leading-8 ">
              {item?.title}
            </h2>
            <p className="text-orange-400 text-2xl ">${item?.price}</p>
            <div>
              <span className="mr-24 text-gray-400 font-light">
                {" "}
                <BiSpreadsheet className="inline mr-1" />
                {item?.lessons} Lessons
              </span>
              <span className="text-gray-400 font-light">
                <CgProfile className="inline mr-1" />
                {item?.students} Students
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CourseCard;
