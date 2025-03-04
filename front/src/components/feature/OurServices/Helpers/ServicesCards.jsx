import { NavLink } from "react-router-dom"
import { useEffect, useRef } from "react";
import { startCardAnimation } from "../../../../animations/animation";
import { footerLinks} from "../../../../utils/static/footerData"


const Cards = ({id, index}) => {

    const cardRef = useRef(null);

    useEffect(() => {
        startCardAnimation(cardRef.current, index);
    }, [index]);

    return (
            <NavLink to={`${id}`} className="cs-model-card mb-2 text-decoration-none" ref={cardRef}>
                <div className="banner">
                    <img src="/assets/img/new-banner-sm.svg" alt="services-banner" />
                </div>
                <div className="content">
                    <h4 className="font-sm font-atyp medium text-left">Buy Property</h4>
                    <p className="font-sm fs-16 text-left">Find your dream home or the perfect investment property with our exclusive listings and market expertise. We guide you through the entire process, from property selection to negotiation and final handover, ensuring a smooth and hassle-free purchase.</p>
                </div>
            </NavLink>
    )
}

const ServicesCards = () => {
  return (
    <>
        <section className="services-cards pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="grid-cs gap-20 gtc-3">
                            {
                                footerLinks[1]?.links?.map((value, index) => (
                                    <Cards key={index} id={value.link} index={index} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ServicesCards