import { useState } from "react";

const Gallery = (data) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const showContent = (index, isHovered) => {
    setHoveredIndex(isHovered ? index : null);
  };

  return (
    <div className="gallery">
      {data?.data?.length &&
        data?.data?.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => showContent(index, true)}
            onMouseLeave={() => showContent(index, false)}
            className="item"
          >
            <img
              src={item?.banner?.s3Url}
              alt={`Property - ${item.description}`}
            />

            <button
              className="round-btn"
              aria-label="View details"
              style={{
                marginTop: hoveredIndex === index ? "20px" : "0px",
                marginRight: hoveredIndex === index ? "20px" : "0px",
              }}
            >
              <i className="fa-regular fa-arrow-up-right"></i>
            </button>
            <div
              className="content"
              style={{ opacity: hoveredIndex === index ? 1 : 0 }}
            >
              <h4 className="font-lg text-left light fs-36">{item.price}</h4>
              <p className="font-lg text-left font-sans light fs-18">
                {item.description}
              </p>
              <div className="flex-cs justify-between w-100">
                <p className="font-lg text-left font-sans light fs-18">
                  {item.name}
                </p>
                <div className="grid-cs gtc-4 data">
                  <div className={"divider"}>
                    <p className="font-lg font-sans light fs-18">{item.sqft}</p>
                    <p className="font-lg font-sans light fs-18">Sq. Feet</p>
                  </div>
                  <div className={"divider"}>
                    <p className="font-lg font-sans light fs-18">
                      {item.bedrooms}
                    </p>
                    <p className="font-lg font-sans light fs-18">Beds</p>
                  </div>
                  <div className={"divider"}>
                    <p className="font-lg font-sans light fs-18">
                      {item.bathrooms}
                    </p>
                    <p className="font-lg font-sans light fs-18">Baths</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

Gallery.propTypes = {
  // Add props if needed
};

export default Gallery;
