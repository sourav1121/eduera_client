import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import FeaturedCourses from "./FeaturedCourses";
import Nav from "./../components/Nav";

function HomeScreen() {
  useEffect(() => {
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
      document.querySelectorAll(".shape").forEach(function (move) {
        var moving_value = move.getAttribute("data-value");
        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;

        move.style.transform =
          "translateX(" + x + "px) translateY(" + y + "px)";
      });
    }
  }, []);

  return (
    <div className="container mx-auto px-48">
      <Nav />
      <header>
        <div className="flex justify-between items-center">
          <div>
            <div className="rounded-full border border-sky-400 flex p-5 items-center mb-10">
              <button className="px-7 py-2 bg-sky-500 rounded-full text-white">
                OFFER
              </button>
              <p className="ml-2 text-sky-400">
                Special offer for the first time register.
              </p>
            </div>
            <h1 className="text-5xl text-myblue mb-10 font-bold">
              Online learning for <br /> growing knowledge
            </h1>
            <p className="text-gray-400 mb-10 text-xl">
              An online platform where you can explore yourself.
            </p>
            <button className="bg-sky-500 hover:bg-myblue transition-all ease-in rounded-l-full px-16 py-5 rounded-tr-full text-white text-xl font-medium">
              Read More <FaArrowRight className="inline" />
            </button>
          </div>
          <div className="w-[40%] relative overflow-hidden">
            <img
              src="/assets/images/yellow-girl.jpg"
              alt=""
              className="rounded-full z-20 w-full"
            />
            <img
              src="/assets/images/dots.png"
              alt=""
              className="absolute top-0 left-0 -z-10 shape"
              data-value="-2"
            />
            <img
              src="/assets/images/elipse-2.png"
              alt=""
              className="absolute top-0 right-0 z-30 shape w-40 "
              data-value="4"
            />
            <img
              src="/assets/images/Ellipse-1.png"
              alt=""
              className="absolute bottom-[10%] left-0 z-40 shape w-16"
              data-value="5"
            />
          </div>
        </div>
        <div className="flex justify-evenly divide-x-2 w-full mt-32 mb-24">
          <div className="p-5">
            <p className="text-2xl font-bold py-2 pr-2 text-myblue">25.000+</p>
            <span className="text-gray-400 font-semibold">Course Creator</span>
          </div>
          <div className="p-5">
            <p className="text-2xl font-bold py-2 pr-2 text-myblue">
              11.4 Million+
            </p>
            <span className="text-gray-400 font-semibold">
              Students Enrolled
            </span>
          </div>
          <div className="p-5">
            <p className="text-2xl font-bold py-2 pr-2 text-myblue">104</p>
            <span className="text-gray-400 font-semibold">
              Countries Using Us
            </span>
          </div>
          <div className="p-5">
            <p className="text-2xl font-bold py-2 pr-2 text-myblue">
              $100 Million+
            </p>
            <span className="text-gray-400 font-semibold">Earned From Us</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomeScreen;
