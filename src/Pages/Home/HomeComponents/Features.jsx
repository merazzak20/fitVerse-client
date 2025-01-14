import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";

const Features = () => {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    // fetch features
    fetch("features.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data);
      });
  }, []);
  console.log(features);
  return (
    <div className="mx-auto my-14">
      <Container>
        <div className="text-center">
          <SectionTitle heading={"Features"}></SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 shadow-md rounded-none"
            >
              <figure className=" border-b-4 border-orange-400 ">
                <img
                  className="hover:scale-110 
                transition h-60 w-full object-cover"
                  src={feature?.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{feature?.title}</h2>
                <p>{feature?.description}</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Features;
