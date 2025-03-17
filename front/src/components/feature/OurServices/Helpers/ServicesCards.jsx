import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { footerLinks } from "../../../../utils/static/footerData";

const Cards = ({ id, name, desc, img }) => {
  return (
    <NavLink to={`${id}`} className="cs-model-card mb-2 text-decoration-none">
      <div className="banner">
        <img src={img} alt={name} />
      </div>
      <div className="content">
        <h4 className="font-sm font-atyp medium text-left">{name}</h4>
        <p className="font-sm fs-16 text-left">{desc}</p>
      </div>
    </NavLink>
  );
};

const ServicesCards = () => {
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

  // Group cards into rows of 3 (assuming gtc-3 means 3 columns)
  const cardsData = footerLinks[1]?.links || [];
  const rows = [];
  for (let i = 0; i < cardsData.length; i += 3) {
    rows.push(cardsData.slice(i, i + 3));
  }

  return (
    <>
      <section className="services-cards pt-cs">
        <div className="container">
          <div className="row" ref={rowRef}>
            <div className="col-md-12">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid-cs gap-20 gtc-3 mb-4"
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
                  {row.map(({ id, name, desc, link, img }) => (
                    <Cards
                      key={id}
                      id={link}
                      name={name}
                      desc={desc}
                      img={img}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesCards;
