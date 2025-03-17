import Heading from "../Headings/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import TestimonialsService from "../../../services/testimonials.service";

const Testimonial = () => {
  const slider = useRef(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: TestimonialsService.getTestimonials,
  });

  const testimonials = [
    {
      id: 1,
      name: "Mohamed Kadir",
      role: "Location",
      comment:
        "I recently had the pleasure of working with Storeys Real Estate for the purchase of my first home, and I couldn’t be happier with the experience. From the moment I contacted them, the team was incredibly responsive and professional. They took the time to understand my needs and provided valuable insights into the market. The process was seamless, and I felt well-supported at every step. Their attention to detail and commitment to ensuring everything went smoothly made all the difference. I highly recommend Storeys to anyone looking for reliable, top-notch real estate services",
      image: "/assets/img/testimonial-1.svg",
    },
    // Add more testimonials for testing
    {
      id: 2,
      name: "John Doe",
      role: "Location",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla",
      image: "/assets/img/testimonial-1.svg",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: "testimonial-slides",
  };

  const TestimonialSlide = ({ name, location, message, image }) => {
    return (
      <div className="slide">
        <img src={image?.s3Url} alt="" className="profile" />
        <div className="content">
          <h2 className="font-lg text-left fs-30">{name}</h2>
          <h6 className="font-sm text-left fs-26 medium">{location}</h6>
          <img className="w-20" src="/assets/img/rates.svg" alt="" />
          <p className="font-sm fs-22 text-left">{message}</p>
          <h4 className="font-lg font-signatie fs-26">{name}</h4>
        </div>
      </div>
    );
  };

  return (
    <section className="pt-cs">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Heading title="What Our Clients Are Saying" className="fs-50" />
            {!isLoading ? (
              <div className="testimonial-slider">
                <Slider ref={slider} {...settings}>
                  {data?.data?.docs.map((testimonial) => (
                    <TestimonialSlide key={testimonial._id} {...testimonial} />
                  ))}
                </Slider>
                <div className="controls">
                  <button
                    className="prev-btn"
                    onClick={() => slider.current.slickPrev()}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="next-btn"
                    onClick={() => slider.current.slickNext()}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center mt-5">Loading...</p>
            )}

            {isError ? (
              <p className="text-center mt-5">
                Testimonials are not able to load. Something went wrong.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
