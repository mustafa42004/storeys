import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Center from "./Center";
import Pill from "./Pill";
import { startCardAnimation } from "../../../../../animations/animation";

const PropertyCard = ({ index, property }) => {
  const { image, location, price, agentName, agentImage } = property;

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
      <NavLink to="/property/1" className="card" ref={cardRef}>
        <div className="banner">
          <img src={image} alt="" />
          <Pill title="For Sale" />
        </div>
        <div className="content">
          <div className="top">
            <h4 className="font-sm text-left dark bold">{location}</h4>
            <h4 className="font-sm text-left font-atyp justify-self-end dark bold">
              {price}
            </h4>
          </div>

          <Center />

          <div className="bottom">
            <div className="profile">
              <img src={agentImage} alt="" />
            </div>
            <h4 className="font-sm text-left fs-20 dark bold">{agentName}</h4>
            <div className="buttons">
              <button>
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
