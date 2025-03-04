import { useEffect, useRef } from "react";
import { startCardAnimation } from "../../../../animations/animation";

const WhoWeAre = () => {

    const bannerRef = useRef(null);

    useEffect(() => {
        startCardAnimation(bannerRef.current, 0);
    }, []);

  return (
    <>
        <section className="who-we-are pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="banner" ref={bannerRef}>
                            <div className="content">
                                <h4 className="font-lg light fs-42">Who We Are</h4>
                                <p className="font-sm medium text-left light">Founded on the principles of integrity, innovation, and client satisfaction, Storeys Real Estate has grown into a market leader, offering a full suite of services, including property sales, interiors, property management, and mortgage solutions. Whether you're a first-time buyer, an investor, or a homeowner looking to enhance your property, our team provides tailored strategies and expert guidance to help you make informed decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default WhoWeAre