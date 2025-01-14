import React from "react";
import { Helmet } from "react-helmet-async";
import heroImg from "../../../assets/hero.jpg";
import Container from "../../../components/Container";
import Button from "../../../components/shared/Button/Button";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className=" top-0  inset-x-0 min-h-[500px] flex items-center justify-start "
    >
      <Helmet>
        <title>FitVerse | Home</title>
      </Helmet>
      <Container>
        <div className="text-white py-20 text-center">
          <h1 className="text-3xl font-semibold md:text-5xl md:font-bold">
            Your Fitness Revolution Starts Here
          </h1>
          <button className="btn btn-sm mt-4 rounded-none bg-orange-500 border-none">
            Join Now!
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
