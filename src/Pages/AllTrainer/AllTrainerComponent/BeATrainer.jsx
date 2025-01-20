import React from "react";
import Container from "../../../components/Container";
import heroImg from "../../../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

const BeATrainer = () => {
  const navigate = useNavigate();
  const handleTrainer = () => {
    navigate("/beAtriner");
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImg})`,
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
            <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
              Are You Ready To?
            </h2>
            <button
              onClick={handleTrainer}
              className="btn btn-block rounded-none bg-orange-500 border-none text-zinc-50 text-lg"
            >
              Become a Trainer
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BeATrainer;
