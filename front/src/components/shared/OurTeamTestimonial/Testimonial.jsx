import Heading from "../Headings/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

const Testimonial = () => {
  const slider = useRef(null);

  const testimonials = [
    {
      image: "/assets/img/our-team-1.svg",
      name: "Mohamed Ibrahim",
      designation: "Founder & CEO",
    },
    // Add more testimonials for testing
    {
      image: "/assets/img/our-team-2.svg",
      name: "Vinayak K",
      designation: "Co-Founder",
    },
    {
      image: "/assets/img/our-team-3.svg",
      name: "Mohamed Sheleek",
      designation: "Co-Founder",
    },
    // Add more testimonials for testing
    {
      image: "/assets/img/our-team-4.svg",
      name: "Arun K",
      designation: "Co-Founder",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    className: "testimonial-slides",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const TestimonialSlide = ({ name, designation, image }) => {
    return (
      <div className="our-team card">
        <img src={image} alt="" />
        <div className="content">
          <h4 className="fs-16 text-left font-atyp dark medium">{name}</h4>
          <p className="fs-12 text-left">{designation}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="pt-cs">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="font-sm mb-4 fs-20 medium">Our Team</p>
            <Heading title="You're in safe hands" className="fs-50" />
            <div className="testimonial-slider cs">
              <Slider ref={slider} {...settings}>
                {testimonials.map((testimonial) => (
                  <TestimonialSlide key={testimonial.id} {...testimonial} />
                ))}
              </Slider>
              <div className="controls justify-content-center mt-4">
                <button
                  className="prev-btn"
                  onClick={() => slider.current.slickPrev()}
                >
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="next-btn"
                  onClick={() => slider.current.slickNext()}
                >
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
