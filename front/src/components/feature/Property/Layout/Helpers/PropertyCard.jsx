import { NavLink } from "react-router-dom"
import Center from "./Center"
import Pill from "./Pill"
import { useEffect, useRef } from "react";
import { startCardAnimation } from "../../../../../animations/animation";
import { propertyData } from '../../../../../utils/static/propertyData'


const PropertyCard = ({index}) => {
    const { image, location, price, agentName, agentImage } = propertyData;
    console.log("Image Found" , image)

    const cardRef = useRef(null);

    useEffect(() => {
        startCardAnimation(cardRef.current, index);
    }, [index]);

  return (
    <>
        <NavLink to="/property/1" className="card" ref={cardRef}>
            <div className="banner">
                <img src={image} alt="" />
                <Pill title="For Sale" />
            </div>
            <div className="content">
                <div className="top">
                    <h4 className="font-sm text-left dark bold">{location}</h4>
                    <h4 className="font-sm text-left font-atyp justify-self-end dark bold">{price}</h4>
                </div>
                
                <Center />

                <div className="bottom">
                    <div className="profile">
                        <img src={agentImage} alt="" />
                    </div>
                    <h4 className="font-sm text-left fs-20 dark bold">{agentName}</h4>
                    <div className="buttons">
                        <button><img src="/assets/img/message.svg" alt="" /></button>
                        <button><img src="/assets/img/call.svg" alt="" /></button>
                    </div>
                </div>
            </div>
        </NavLink>
    </>
  )
}

export default PropertyCard