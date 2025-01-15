import React from "react";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const slot = location.state?.slot;
  return (
    <div className="my-14">
      <Container>
        <h1>{slot}</h1>
      </Container>
    </div>
  );
};

export default Booking;
