import React from "react";
import { Outlet } from "react-router-dom";
import Navbars from "../components/shared/Navbar/Navbars";
import Footer from "../components/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbars></Navbars>
      </div>
      <div className="min-h-[calc(100vh-288px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
