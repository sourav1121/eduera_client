import React from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";

function Sidebar() {
  const categories = useLoaderData();
  const handleClick = (id) => {
    const categoryData = categories.find((item) => id === item.id);

    console.log(categoryData);
  };

  return (
    <div className="flex">
      <div className="max-h-[350px] flex flex-row sticky top-0">
        <div className="flex flex-col w-56 bg-myblue rounded-r-3xl overflow-hidden shadow-md">
          <ul className="flex flex-col py-4">
            {categories.map((category) => (
              <Link to={`/courses/${category.id}`} key={category.id}>
                <li>
                  <span
                    onClick={(e) => handleClick(category.id)}
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"></span>
                    <span className="text-md font-medium text-white">
                      {category.category_name}
                    </span>
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Sidebar;
