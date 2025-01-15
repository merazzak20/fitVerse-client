import React from "react";
import Container from "../../../components/Container";
import heroImg from "../../../assets/hero.jpg";

const BeATrainer = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${heroImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className=" top-0  inset-x-0 py-20 flex items-center justify-start "
    >
      <Container>
        <div className=" mx-auto text-center flex items-center justify-evenly">
          <div className="w-full">
            <h2 className="text-white text-4xl font-bold mb-4">
              Are You Ready To?
            </h2>
            <button className="btn btn-block rounded-none bg-orange-500 border-none text-zinc-50 text-lg">
              Become a Trainer
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BeATrainer;
