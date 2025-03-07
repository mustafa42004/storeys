import { useEffect, useState } from 'react'
import Heading from '../../../shared/Headings/Heading'
import Gallery from './Gallery'


const Properties = () => {
      const [isMobile , setIsMobile] = useState(false)
      
      useEffect(()=>{
        window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
      },[])
  return (
    <>
        <section className="properties pt-cs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Heading title="Featured Properties" className={ `${isMobile ? "fs-42 w-80" : "w-60"}`} description=' Explore our handpicked selection of exceptional properties, each designed to inspire and elevate your lifestyle' descriptionClassName='medium fs-22' />

                        <div className="mt-5">
                            <Gallery />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Properties