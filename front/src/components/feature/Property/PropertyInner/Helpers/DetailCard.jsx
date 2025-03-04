import { useEffect, useState } from "react"

const DetailCard = () => {

    const [ isMobile , setIsMobile] = useState(false)

    useEffect(() => {
        window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
    }, [])
    

  return (
    <>
        <div className="container pt-cs">
            <div className="row">
                <div className="col-md-12">
                    <div className="property-inner-card ">
                        <div className="head divide">
                            <div className="item ">

                                <h4 className={ `${isMobile ? "fs-26 text-left" : 'font-sm fs-50'}`}>Dubai, Jumeirah Village Circle</h4>
                                <p className={ `${isMobile ? "fs-14 text-left" : 'font-sm text-left fs-20'}`}>Dubai, Jumeirah Village</p>
                            </div>
                            <h4 className={ `${isMobile ? "font-lg medium fs-30" : 'font-lg medium fs-50'}`}>699,000 AED</h4>
                        </div>
                        <div className="bottom">
                            <div className="item">
                                <h4 className={ `${isMobile ? 'font-sm text-left fs-20 dark' : 'font-sm text-left fs-22 dark'}`}>Apartment</h4>
                                <p className={`${isMobile ? 'font-sm text-left fs-12' : 'font-sm text-left fs-14'}`}>Property Type</p>
                            </div>
                            <div className="icons">
                            <h4 className="font-sm text-left dark medium ">3 &nbsp; <img src="/assets/img/bed.svg" alt="" className="icon" /></h4>
                            <h4 className="font-sm text-left dark medium ">2 &nbsp; <img src="/assets/img/bathroom.svg" alt="" className="icon" /></h4>
                            <h4 className="font-sm text-left dark medium ">1,420 m<sup>2</sup> &nbsp; <img src="/assets/img/sqft.svg" alt="" className="icon" /></h4>
                            <h4 className="font-sm text-left dark medium ">1 &nbsp; <img src="/assets/img/car.svg" alt="" className="icon" /></h4>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailCard