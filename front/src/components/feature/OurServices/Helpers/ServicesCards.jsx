import { NavLink } from "react-router-dom"
import { useEffect, useRef } from "react";
import { startCardAnimation } from "../../../../animations/animation";
import { footerLinks} from "../../../../utils/static/footerData"


const Cards = ({id, name, desc, img, index}) => {

    const cardRef = useRef(null);

    useEffect(() => {
        startCardAnimation(cardRef.current, index);
    }, [index]);

    return (
            <NavLink to={`${id}`} className="cs-model-card mb-2 text-decoration-none" ref={cardRef}>
                <div className="banner">
                    <img src={img}  alt={name}/>
                </div>
                <div className="content">
                    <h4 className="font-sm font-atyp medium text-left">{name}</h4>
                    <p className="font-sm fs-16 text-left">{desc}</p>
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
                                footerLinks[1]?.links?.map(({ id, name, desc, link, img }, index) => (
                                    <Cards 
                                    key={id} 
                                    id={link} 
                                    name={name} 
                                    desc={desc} 
                                    img={img} 
                                    index={index} 
                                    />
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