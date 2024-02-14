import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container mx-auto px-48">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
