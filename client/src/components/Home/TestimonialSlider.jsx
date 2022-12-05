import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";
import "./TestimonialSlider.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

function TestimonialSlider() {
  return (
    <section className="testimonial-section">
      <Swiper
        slidesPerView={1}
        // cssMode={true}
        navigation={true}
        // pagination={true}
        // mousewheel={true}
        // keyboard={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {/* Other option is create div elements in each SwiperSlide */}
        <SwiperSlide>
          <div className="slide swiper-slide">
            {/* <img src="#" alt="" className="image" /> */}
            <p>
              ‟I had an amazing experience working with Donna. he is very
              knowledgeable and always responds quickly when I have a question.
              I would recommend her to anyone.”
            </p>

            <i className="bx bxs-quote-alt-left quote-icon"></i>

            <div className="details">
              <span className="name">Peter</span>
              <span className="city">Anaheim, California</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide swiper-slide">
            {/* <img src="#" alt="" className="image" /> */}
            <p>
              ‟I had an amazing experience working with Donna. he is very
              knowledgeable and always responds quickly when I have a question.
              I would recommend her to anyone.”
            </p>

            <i className="bx bxs-quote-alt-left quote-icon"></i>

            <div className="details">
              <span className="name">Emma</span>
              <span className="job">Cerritos, California</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide swiper-slide">
            {/* <img src="#" alt="" className="image" /> */}
            <p>
              ‟I had an amazing experience working with Donna. he is very
              knowledgeable and always responds quickly when I have a question.
              I would recommend her to anyone.”
            </p>

            <i className="bx bxs-quote-alt-left quote-icon"></i>

            <div className="details">
              <span className="name">John</span>
              <span className="job">Lakewood, California</span>
            </div>
          </div>
        </SwiperSlide>

        {/* if we want to add additional testimonials */}
        {/* <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </section>
  );
}

export default TestimonialSlider;
