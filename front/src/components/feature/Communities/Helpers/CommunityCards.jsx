import { NavLink } from "react-router-dom"
import { startCardAnimation } from "../../../../animations/animation";
import { useEffect, useRef } from "react";
import { communitiesData } from "../../../../utils/static/communitiesData";

const Cards = ({name, desc , img ,index}) => {
    const cardRef = useRef(null);

    useEffect(() => {
        startCardAnimation(cardRef.current, index);
    }, [index]);
    return (
        <NavLink 
        to={`/communitiesData`}
        ref={cardRef} 
        className="community-card text-decoration-none"
        style={{ 
        backgroundImage: `url(${img})`, 
        backgroundSize: "cover",  // Ensure the image covers the entire area
        backgroundPosition: "center",  // Center the image
        backgroundRepeat: "no-repeat" // Prevent repeating
    }}
    >
        <div className="content">
            <h4 className="font-lg text-left fs-18 light medium">{name}</h4>
            <p className="font-sm text-left light fs-16">{desc}</p>
        </div>
    </NavLink>
    )
}


const CommunityCards = () => {

  return (
    <>
        <section className="pt-cs communities">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="grid-cs gap-20 gtc-3 layout">
                        {
        communitiesData[0].cards.map((item, index) => (
            <Cards 
                key={item.id} 
                index={index} 
                name={item.name} 
                desc={item.desc} 
                img={item.img}
            />
        ))
    }                        
                        </div>
                        <div className="w-100 mt-5 flex-cs">
                            <button className="cs-btn">Explore More <i className="fa-regular fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default CommunityCards

