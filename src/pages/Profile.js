import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Profile() {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    photoURL: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const { name, photoURL } = data;
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="h-full">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="flex justify-between">
              <span className="text-xl font-semibold block">User Profile</span>
            </div>

            <span className="text-gray-600">{user?.displayName}</span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src={user?.photoURL}
                alt=""
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
            <div className="rounded  shadow p-6">
              <form onSubmit={handleUpdateProfile}>
                <div className="pb-6">
                  <label
                    htmlFor="name"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Name
                  </label>
                  <div className="flex">
                    <input
                      name="name"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      type="text"
                      defaultValue={user?.displayName}
                      onBlur={handleChange}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <label
                    htmlFor="email"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Email
                  </label>
                  <input
                    disabled
                    id="email"
                    name="email"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="email"
                    defaultValue={user?.email}
                  />
                </div>
                <div className="pb-4">
                  <label
                    htmlFor="photoURL"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Photo URL
                  </label>
                  <input
                    name="photoURL"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    defaultValue={user?.photoURL}
                    onBlur={handleChange}
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="mt-4 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
