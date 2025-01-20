import React from "react";
import Hero from "./HomeComponents/Hero";
import Features from "./HomeComponents/Features";
import About from "./HomeComponents/About";
import Classes from "./HomeComponents/Classes";
import Feedback from "./HomeComponents/Feedback";
import Newsletter from "./HomeComponents/Newsletter";
import TrainerSection from "./HomeComponents/TrainerSection";
import ForumHome from "./HomeComponents/ForumHome";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <About></About>
      <Classes></Classes>
      <Feedback></Feedback>
      <ForumHome></ForumHome>
      <Newsletter></Newsletter>
      <TrainerSection></TrainerSection>
    </div>
  );
};

export default Home;
