import React, { useEffect, useRef, useState } from "react";

const Heading = ({
  isHome = false,
  title,
  className,
  width,
  description,
  descriptionClassName,
}) => {
  const titleRef = useRef(null);
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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="headings">
        <div className="headings" style={{ width: `${width}%` || "100%" }}>
          <h4
            className={`font-header ${className} ${
              isVisible ? "fade-in-up" : ""
            } ${isHome ? "home-lg-heading" : ""}`}
            ref={titleRef}
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              ...(isVisible && {
                opacity: 1,
                transform: "translateY(0)",
              }),
            }}
          >
            {title}
          </h4>
          {isHome ? (
            <h4
              className={`font-header ${className} ${
                isVisible ? "fade-in-up" : ""
              } home-sm-heading`}
              ref={titleRef}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
                ...(isVisible && {
                  opacity: 1,
                  transform: "translateY(0)",
                }),
              }}
            >
              {title.split(" . ").slice(0, 2).join(" . ")}
              <br />
              {title.split(" . ").at(2)}
            </h4>
          ) : null}
          {description && (
            <p
              className={`font-sm ${descriptionClassName} ${
                isVisible ? "fade-in-up" : ""
              }`}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                ...(isVisible && {
                  opacity: 1,
                  transform: "translateY(0)",
                }),
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Heading;
