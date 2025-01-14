import React from "react";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import aboutImg from "../../../assets/footer.jpg";

const About = () => {
  return (
    <div className="my-14">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <img className="max-h-[500px] object-cover" src={aboutImg} alt="" />
          </div>
          <div>
            <h2 className=" font-bold text-3xl uppercase">
              About <span className="text-orange-500">Fitverse</span>
            </h2>

            <p className="my-4 text-justify">
              Welcome to FitVerse, where fitness meets innovation and passion
              fuels transformation. Our mission is to revolutionize the fitness
              industry by offering a comprehensive platform that inspires,
              motivates, and supports individuals to lead healthier, more active
              lives.
            </p>
            <p className="my-4 text-justify">
              At FitVerse, we go beyond the traditional gym experience. We
              provide state-of-the-art equipment, advanced fitness technology,
              and personalized training programs tailored to your unique needs.
              Whether you’re a beginner or a fitness enthusiast, we’ve created
              an environment where everyone can thrive.
            </p>
            <p className="my-1">
              <strong className=" text-orange-800">
                Innovative Fitness Solutions:
              </strong>{" "}
              From state-of-the-art equipment to smart progress tracking tools,
              we redefine the workout experience.
            </p>
            <p>
              <strong className="text-orange-800">Expert Guidance:</strong> Our
              certified trainers are dedicated to helping you achieve your goals
              with personalized support and encouragement.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
