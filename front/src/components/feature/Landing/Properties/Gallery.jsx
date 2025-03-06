import { useState } from "react";
// import PropTypes from 'prop-types';

const Gallery = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const showContent = (index, isHovered) => {
        setHoveredIndex(isHovered ? index : null);
    }

    const galleryItems = [
        {
            image: "/assets/img/gallery-1.svg",
            price: "1,100,000 AED",
            description: "Luxury Apartment with Marina View",
            names: "Dubai, Meydan, Meydan One",
            data: [
                { name: "1058", value: "Sq. Feet" },
                { name: "02", value: "Beds" },
                { name: "02", value: "Baths" }
            ]
        },
        {
            image: "/assets/img/gallery-2.svg",
            price: "2,500,000 AED",
            description: "Premium Penthouse Suite",
            names: "Dubai Marina, JBR",
            data: [
                { name: "2100", value: "Sq. Feet" },
                { name: "03", value: "Beds" },
                { name: "03", value: "Baths" }
            ]
        },
        {
            image: "/assets/img/gallery-3.svg",
            price: "3,200,000 AED",
            description: "Beachfront Villa",
            names: "Palm Jumeirah, Dubai",
            data: [
                { name: "3500", value: "Sq. Feet" },
                { name: "04", value: "Beds" },
                { name: "04", value: "Baths" }
            ]
        },
        {
            image: "/assets/img/gallery-4.svg",
            price: "1,800,000 AED",
            description: "Modern Downtown Apartment",
            names: "Downtown Dubai, Burj Area",
            data: [
                { name: "1500", value: "Sq. Feet" },
                { name: "02", value: "Beds" },
                { name: "03", value: "Baths" }
            ]
        }
    ];

    return (
        <div className="gallery">
        {/* <div className="main-image"> */}
            {galleryItems.map((item, index) => (
                <div 
                    key={index}
                    onMouseEnter={() => showContent(index, true)} 
                    onMouseLeave={() => showContent(index, false)} 
                    className="item"
                >
                    <img src={item.image} alt={`Property - ${item.description}`} />
                    <button className="round-btn" aria-label="View details">
                        <i className="fa-regular fa-arrow-up-right"></i>
                    </button>
                    <div className="content" style={{ opacity: hoveredIndex === index ? 1 : 0 }}>
                        <h4 className="font-lg text-left light fs-36">{item.price}</h4>
                        <p className="font-lg text-left font-sans light fs-18">{item.description}</p>
                        <div className="flex-cs justify-between w-100">
                            <p className="font-lg text-left font-sans light fs-18">{item.names}</p>
                            <div className="grid-cs gtc-4 data">
                                {item.data.map((dataItem, dataIndex) => (
                                    <div key={dataIndex} className={dataIndex !== 2 ? "divider" : ""}>
                                        <p className="font-lg font-sans light fs-18">{dataItem.name}</p>
                                        <p className="font-lg font-sans light fs-18">{dataItem.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
             
        
        
        
            {/* <div className="side-images">
    {galleryItems.slice(1).map((item, index) => (
        <div 
            key={index + 1}
            onMouseEnter={() => showContent(index + 1, true)} 
            onMouseLeave={() => showContent(index + 1, false)} 
            className="item small"
        >
            <img src={item.image} alt={`Property - ${item.description || "Image"}`} />
            <button className="round-btn" aria-label="View details">
                <i className="fa-regular fa-arrow-up-right"></i>
            </button>
        </div>
    ))}
</div> */}
        </div>
    );
};

Gallery.propTypes = {
    // Add props if needed
};

export default Gallery;



