import { useEffect, useRef } from "react";
import { startCardAnimation } from "../../../../animations/animation";

const Cards = ({ image, name, designation, index }) => {

    const cardRef = useRef(null);

    useEffect(() => {
        startCardAnimation(cardRef.current, index);
    }, [index]);

  return (
    <>
        <div className="card" ref={cardRef}>
            <img src={image} alt="" />
            <div className="content">
                <h4 className="font-sm text-left font-atyp dark medium">{name}</h4>
                <p className="font-sm text-left">{designation}</p>
            </div>
        </div>
    </>
  )
}

export default Cards