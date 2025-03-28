import { useState, useEffect } from "react";
import Heading from "../../../shared/Headings/Heading";
import Slider from "./Slider";

const DevSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true);
  }, []);

  return (
    <>
      <section className="dev-section pt-cs">
        <div className="container">
          <Heading
            title="Our Partners"
            className={`${isMobile ? "fs-42" : "auto"}`}
          />
        </div>
        <Slider />
      </section>
    </>
  );
};

export default DevSection;
