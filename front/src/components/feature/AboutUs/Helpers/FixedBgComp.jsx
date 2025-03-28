
import { useState, useEffect } from "react";
import Counter from "./Counter"
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
        <div className="counter-fixed-layout">
            <div className="container">
                <h6 className="font-lg font-sans light ab-coun-sub-head">Storeys in numbers</h6>

                <h4 className={ `${isMobile ? "fs-36 light text-center mt-lg-5 mt-4 ab-count-head" : "light font-lg fs-42 mt-lg-5 mt-4 ab-count-head"}`}>Storeys is the Brightest and Fastest growing Real Estate Brokerage Firm in Dubai.</h4>
                <Counter />
            </div>
        </div>
    </>
  )
}
export default FixedBgComp;



