import { NavLink } from "react-router-dom"
import { startCardAnimation } from "../../../../animations/animation";
import { useEffect, useRef } from "react";

const Cards = ({index}) => {
    const cardRef = useRef(null);

    useEffect(() => {
        startCardAnimation(cardRef.current, index);
    }, [index]);
    return (
        <NavLink to="/community-details" ref={cardRef} className="community-card text-decoration-none">
            <div className="content">
                <h4 className="font-lg text-left light fs-18 medium">Jumeirah Village Circle Area Guide</h4>
                <p className="font-sm text-left light fs-16">One of the master-planned communities for families</p>
            </div>
        </NavLink>
    )
}


const CommunityCards = () => {

    const array = [1, 2, 3, 4]

  return (
    <>
        <section className="pt-cs communities">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="layout">
                            {
                                array.map((value, index) => (
                                    <Cards key={index} index={index} />
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