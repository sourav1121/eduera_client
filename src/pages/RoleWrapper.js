import React from "react";
import { Link } from "react-router-dom/dist";

const RoleWrapper = () => {
  return (
    <div className="flex h-screen bg-navy-700">
      <Link
        to={{ pathname: "/login", state: { role: "student" } }}
        className="w-1/2 h-full flex items-center justify-center text-white text-2xl bg-opacity-30 hover:bg-opacity-60 transition-all duration-500 ease-in-out bg-navy-900"
      >
        <div className="p-20 text-center">
          <h2>Student</h2>
        </div>
      </Link>
      <Link
        to={{ pathname: "/login", state: { role: "instructor" } }}
        className="w-1/2 h-full flex items-center justify-center text-white text-2xl bg-opacity-30 hover:bg-opacity-60 transition-all duration-500 ease-in-out bg-navy-900"
      >
        <div className="p-20 text-center">
          <h2>Instructor</h2>
        </div>
      </Link>
    </div>
  );
};

export default RoleWrapper;
