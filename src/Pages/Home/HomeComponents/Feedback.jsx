import React from "react";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/shared/Loading";
import Slider from "react-slick";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbacks, isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/reviews");
      return data;
    },
  });

  if (isLoading) return;
  return (
    <div className="my-14">
      <Container>
        <div className="text-center">
          <SectionTitle heading={"Feedback"}></SectionTitle>
        </div>
        <div>
          <Swiper
            cssMode={true}
            slidesPerView={2}
            loop={true}
            autoplay={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {feedbacks.map((feed) => (
              <SwiperSlide className="px-20" key={feed?._id}>
                <div className=" text-center flex flex-col items-center">
                  <p>{feed?.feedback}</p>
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={feed.star_rating}
                    readOnly
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Feedback;
