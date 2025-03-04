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
                        <Heading title="Featured Properties" className={ `${isMobile ? "fs-42 w-80" : "w-60"}`} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve' descriptionClassName='medium' />

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