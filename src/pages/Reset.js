import React, { useContext, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";

function Reset() {
  const [email, setEmail] = useState();

  useTitle("Reset");

  const { passwordReset, setLoading } = useContext(AuthContext);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    passwordReset(email)
      .then((result) => {
        toast.success("Password reset link has been sent to your email");
      })
      .catch((error) => toast.error(error.code));
  };

  return (
    <div className="">
      <div className="flex flex-col items-center min-h-[500px] sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Learnera.</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSumbit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
