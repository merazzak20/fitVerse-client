import React from "react";
import Hero from "./HomeComponents/Hero";
import Features from "./HomeComponents/Features";
import About from "./HomeComponents/About";
import Classes from "./HomeComponents/Classes";
import Feedback from "./HomeComponents/Feedback";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <About></About>
      <Classes></Classes>
      <Feedback></Feedback>
    </div>
  );
};

export default Home;
