import { Link } from "react-router-dom"
const Banner = () => {
  return (
    <>
        <div className="banner">
            <Link to= '/property'className="cs-btn light">Explore More <i className="fa-regular fa-arrow-right"></i></Link>
            <h4 className="font-lg light font-sans content">Your Gateway to Dubai’s Real Estate Future</h4>
        </div>
    </>
  )
}

export default Banner