
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
            <h6 className="font-lg font-sans light">Storeys in numbers</h6>

            <h4 className={ `${isMobile ? "fs-36 light text-center w-80 " : "light font-lg w-80 fs-50"}`}>Storeys is the Brightest and Fastest growing Real Estate Brokerage Firm in Dubai.</h4>
            <Counter />
        </div>
    </>
  )
}
export default FixedBgComp;



