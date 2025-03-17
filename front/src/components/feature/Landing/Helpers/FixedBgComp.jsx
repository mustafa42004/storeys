import { useEffect, useState } from "react";
import Heading from "../../../shared/Headings/Heading"
import { Link } from "react-router-dom";

const FixedBgComp = () => {
    const [isMobile, setIsMobile] = useState(false);
    
  
      useEffect(() => {
        const handleSize = () => {
          setIsMobile(window.innerWidth <= 767);
        };
    
        handleSize(); //  Set initial value correctly
        window.addEventListener("resize", handleSize);
    
        return () => window.removeEventListener("resize", handleSize);
      }, []);
  return (
    <>
        <Heading title="List your property" className={ `${isMobile ? "fs-36 light w-80 " : "light fs-60"}`} description="Take your property ‘Exclusive’ with Storeys and enjoy all the exclusive benefits." descriptionClassName="light" />

        <Link  to = '/contact' className="cs-btn light">Book a Valuation <i className="fa-regular fa-arrow-right"></i></Link>
    </>
  )
}

export default FixedBgComp;
