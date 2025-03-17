import Heading from "../../../shared/Headings/Heading"
import { Link } from "react-router-dom"

const FixedBgComp = ({ title, description, buttonText }) => {

  return (
    <>
        <Heading title={title} width={75} className={window.innerWidth > 767 ? 'light' : 'fs-36 light w-80'}  description={description} descriptionClassName="light" />

        <Link to='/contact' className="cs-btn light">{buttonText} <i className="fa-regular fa-arrow-right"></i></Link>
    </>
  )
}

export default FixedBgComp