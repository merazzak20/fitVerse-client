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
  console.log(feedbacks);
  if (isLoading) return;
  return (
    <div className="my-14 mb-16 bg-orange-50 py-5 pb-10">
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
                  <img
                    className="w-20 h-20 rounded-full border-orange-600 border-4 object-cover"
                    src={feed?.image}
                    alt={feed?.name}
                  />
                  <p className="text-2xl font-bold text-center my-3">
                    {feed?.name}
                  </p>
                  <p>{feed?.feedback}</p>
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={parseFloat(feed.star_rating)}
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
