import React, { useContext, useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../contexts/AuthProvider";
import { ErrorMessage } from "@hookform/error-message";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useTitle from "../hooks/useTitle";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const password = useRef();
  const [error, setError] = useState("");
  const { signIn, setLoading, providerLogin, storeProviderUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  console.log(from);

  useTitle("Login");

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [role, setRole] = useState(null);
  const [step, setStep] = useState(0);

  const googleSignin = () => {
    setLoading(true);
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        if (user) {
          storeProviderUser(user?.email, user?.uid, role).then((result) => {
            if (result === "success") {
              toast("Login Success");
              setLoading(false);
              navigate(`"${from}"`);
            }
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoading(false);
        toast(errorCode);
      });
  };

  const githubSignin = () => {
    providerLogin(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (user) {
          toast("Login Success");
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        toast(errorCode);
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setError("");
        if (user.emailVerified) {
          navigate(from, { replace: true });
        } else {
          toast.error(
            "Your email is not verified. Please verify your email address."
          );
        }
      })
      .catch((error) => {
        toast.error(error.code);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleNextClick = () => {
    if (!role) {
      alert("Please select a role before proceeding.");
      return;
    }
    setStep(1);
  };

  const handleDotClick = (index) => {
    if (role) {
      setStep(index);
    }
  };

  return (
    <div className="relative w-full h-[75vh] overflow-hidden m-auto bg-gray-100">
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
          step === 0 ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold mb-10">Choose an account</h1>
        <div className="flex w-full justify-between gap-5 px-5">
          <div
            onClick={() => handleRoleSelection("student")}
            className={`flex flex-col items-center justify-center w-full h-64 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out ${
              role === "student" ? "border-2 border-blue-500" : ""
            }`}
          >
            <FaUserGraduate className="mb-2 w-16 h-16 text-blue-500" />

            <h2 className="text-lg font-bold">Student Account</h2>
          </div>
          <div
            onClick={() => handleRoleSelection("teacher")}
            className={`flex flex-col items-center justify-center w-full h-64 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out ${
              role === "teacher" ? "border-2 border-blue-500" : ""
            }`}
          >
            <MdOutlineAdminPanelSettings className="mb-2 w-16 h-16 text-blue-500" />
            <h2 className="text-lg font-bold">Admin Account</h2>
          </div>
        </div>
        <button
          onClick={handleNextClick}
          disabled={!role}
          className={`mt-10 px-4 py-2 rounded-lg ${
            role ? "bg-purple-500 text-white" : "bg-gray-500 text-gray-300"
          } cursor-${role ? "pointer" : "not-allowed"}`}
        >
          Next
        </button>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out ${
          step === 1 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center w-full h-full sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <a href="/">
              <h3 className="text-4xl font-bold text-purple-600">Learnera.</h3>
            </a>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form onSubmit={(e) => e.preventDefault()}>
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
                    {...register("email", {
                      required: "This is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type} className="text-red-500">
                          *{message}
                        </p>
                      ))
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    ref={password}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register("password", {
                      required: "This is required.",
                      minLength: {
                        value: 6,
                        message: "Minimum length is 6.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type} className="text-red-500">
                          *{message}
                        </p>
                      ))
                    }
                  />
                </div>
                <Link to="/reset">
                  <span className="text-sm text-gray-400 text-underline hover:border-b-2">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <div className="flex items-center justify-end mt-4">
                <Link
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  to="/register"
                >
                  Signup Today
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  onClick={handleSubmit(onSubmit)}
                >
                  Login
                </button>
                <button
                  onClick={googleSignin}
                  className="bg-gray-200 rounded-lg px-4 py-2 mx-4"
                >
                  <FcGoogle />
                </button>
                <button
                  onClick={githubSignin}
                  className="bg-gray-200 rounded-lg px-4 py-2"
                >
                  <AiFillGithub />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              step === i ? "bg-purple-500" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Login;
