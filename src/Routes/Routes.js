import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomeScreen from "../pages/HomeScreen";
import FeaturedCourses from "../pages/FeaturedCourses";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "../Routes/PrivateRoute";
import Profile from "../pages/Profile";
import AuthPrevent from "./AuthPrevent";
import Courses from "./../pages/Courses";
import Sidebar from "../components/Sidebar";
import CourseCategory from "../pages/CourseCategory";
import Nav from "./../components/Nav";
import CourseDetails from "./../pages/CourseDetails";
import Reset from "./../pages/Reset";
import Footer from "./../components/Footer";
import FAQ from "../pages/FAQ";
import Blog from "./../pages/Blog";
import PageNotFound from "../pages/PageNotFound";
import Checkout from "../pages/Checkout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/success",
        element: (
          <h1 className="text-5xl font-semibold text-center bg-gray-200 text-myblue p-5 rounded-lg">
            Thanks for the Payment :) <br /> Stay tuned
          </h1>
        ),
      },
      {
        path: "/cancel",
        element: (
          <h1 className="text-5xl font-semibold text-center bg-gray-200 text-myblue p-5 rounded-lg">
            No problem visit us next time :) <br /> Stay tuned
          </h1>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthPrevent>
            <Register />
          </AuthPrevent>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthPrevent>
            <Login />
          </AuthPrevent>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:categoryId/:courseId",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:5000/courses/${params.categoryId}/${params.courseId}`
          );
          return res.json();
        },
      },
      {
        path: "/reset",
        element: <Reset />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/",
    index: true,
    element: (
      <>
        <HomeScreen />
        <FeaturedCourses />
        <div className="container mx-auto px-48">
          <Footer />
        </div>
      </>
    ),
    loader: async () => {
      const res = await fetch("http://localhost:5000/courses");
      return res.json();
    },
  },
  {
    path: "/courses",
    element: (
      <>
        <div className="container mx-auto px-48">
          <Nav />
        </div>
        <div className="container mx-auto">
          <Sidebar />
          <Footer />
        </div>
      </>
    ),
    children: [
      {
        path: "/courses",
        element: <Courses />,
        loader: async () => {
          const res = await fetch("http://localhost:5000/courses");
          return res.json();
        },
      },
      {
        path: "/courses/:categoryId",
        element: <CourseCategory />,
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:5000/courses/${params.categoryId}`
          );
          return res.json();
        },
      },
      {
        path: "/courses/:categoryId/:courseId",
        element: <CourseDetails />,
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:5000/courses/${params.categoryId}/${params.courseId}`
          );
          return res.json();
        },
      },
    ],
    loader: async () => {
      const res = await fetch("http://localhost:5000/courses");
      return res.json();
    },
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
