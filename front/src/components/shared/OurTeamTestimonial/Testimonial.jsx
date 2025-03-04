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
            name: "Talan Culhane",
            designation: "Sales Manager"
        },
        // Add more testimonials for testing
        {
            image: "/assets/img/our-team-1.svg",
            name: "John Doe",
            designation: "Sales Manager"
        },
        {
            image: "/assets/img/our-team-1.svg",
            name: "Talan Culhane",
            designation: "Sales Manager"
        },
        // Add more testimonials for testing
        {
            image: "/assets/img/our-team-1.svg",
            name: "John Doe",
            designation: "Sales Manager"
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth > 768 ? 4 : 1,
        slidesToScroll: 1,
        arrows: false,
        className: "testimonial-slides"
    };

    const TestimonialSlide = ({ name, designation, image }) => {
        return (
            <div className="our-team card">
                <img src={image} alt="" />
                <div className="content">
                    <h4 className="font-sm text-left font-atyp dark medium">{name}</h4>
                    <p className="font-sm text-left">{designation}</p>
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
                            <button className="prev-btn" onClick={() => slider.current.slickPrev()}>
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button className="next-btn" onClick={() => slider.current.slickNext()}>
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