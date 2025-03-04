import Heading from "../Headings/Heading"
const FixedBg = ({ height, Component, className }) => {



  return (
    <>
        <section className="pt-cs ">
            <div className={`fixed-bg ${className}`} style={{ height: `${height}px` || "290px"}} >
                {Component}
            </div> 
        </section>
    </>
  )
}

export default FixedBg
