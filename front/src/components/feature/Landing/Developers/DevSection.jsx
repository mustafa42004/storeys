import { useState, useEffect } from "react"
import Heading from "../../../shared/Headings/Heading"
import Slider from "./Slider"

const DevSection = () => {
  const [isMobile , setIsMobile] = useState(false)
  
  useEffect(()=>{
    window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
  },[])
  


  return (
    <>
        <section className="dev-section pt-cs">
            <Heading title="Our Developers" className={ `${isMobile ? "fs-50 w-80 " : "auto"}`}/>
            <Slider />
        </section>
    </>
  )
}

export default DevSection