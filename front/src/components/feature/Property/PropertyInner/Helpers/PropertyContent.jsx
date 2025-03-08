import ProfileCard from "./ProfileCard";
import Content from "./Content";
import { useEffect, useState } from "react";

const PropertyContent = ({top}) => {
    const [isMobile , setIsMobile] = useState(false)


    useEffect(() => {
        window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)

    }, [])
  return (
    <>
        <section className="property-content pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="layout">
                            <div className={ `${isMobile ? "w-100" : 'w-60'} "content`}>
                                <Content />
                            </div>
                            <div className={ `${isMobile ? "w-100" : 'w-40'} profile-card-layout`} style={isMobile ? { top: 0 } : { top: top }}>
                                <ProfileCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default PropertyContent