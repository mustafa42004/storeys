import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="slick-arrow slick-prev" onClick={onClick} style={{ zIndex: 1 }}>
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="slick-arrow slick-next" onClick={onClick} style={{ zIndex: 1 }}>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    );
};

const Carousel = ({ banner }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnFocus: true,
    };

    return (
        <>
            <Slider 
            {...settings} 
            prevArrow={<CustomPrevArrow />} 
            nextArrow={<CustomNextArrow />} 
            style={{ height: '700px', overflow: 'hidden' }}
        >
            {banner.map((item) => (
                <div key={item.uniqueid}>
                    <img src={item.s3Url} alt={item.s3Key} style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
                </div>
            ))}
        </Slider>
    </>
  )
}

export default Carousel