import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Center from "./Center";
import Pill from "./Pill";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ index, property }) => {
  const {
    banner,
    city,
    price,
    agentName,
    agentImage,
    bathrooms,
    bedrooms,
    sqft,
    _id,
  } = property;

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current);
      }
    };
  }, []);

  // Calculate which row this card belongs to (assuming 4 cards per row)
  const rowIndex = Math.floor(index / 4);

  // useEffect(() => {
  //   startCardAnimation(cardRef.current, index);
  // }, [index]);

  return (
    <div
      className="property-card"
      ref={rowRef}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 0.8s ease ${
          rowIndex * 0.3
        }s, transform 0.8s ease ${rowIndex * 0.3}s`,
        ...(isVisible && {
          opacity: 1,
          transform: "translateY(0)",
        }),
      }}
    >
      <NavLink to={`/property/${_id}`} className="card" ref={cardRef}>
        <div className="banner">
          <img src={banner?.s3Url} alt="" />
          <Pill title={`For ${property?.status}`} />
        </div>
        <div className="content">
          <div className="top">
            <h4 className="font-sm text-left dark bold">{city}</h4>
            <h4 className="font-sm text-left font-atyp justify-self-end dark bold">
              {new Intl.NumberFormat("en-AE", {
                style: "currency",
                currency: "AED",
                maximumFractionDigits: 0,
                currencyDisplay: "code",
              })
                ?.format(Number(price))
                ?.replace("AED", "")
                ?.trim() + " AED"}{" "}
            </h4>
          </div>

          <Center baths={bathrooms} beds={bedrooms} sqft={sqft} />

          <div className="bottom">
            <div className="profile">
              <img src={"/assets/img/property-profile.svg"} alt="agent-image" />
            </div>
            <h4 className="font-sm text-left fs-20 dark bold">
              {"Talan Culhane"}
            </h4>
            <div className="buttons">
              <button onClick={() => navigate("/contact")}>
                <img src="/assets/img/message.svg" alt="" />
              </button>
              <button>
                <img src="/assets/img/call.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default PropertyCard;
