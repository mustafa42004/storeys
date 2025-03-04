import Heading from "../../../shared/Headings/Heading"

const FixedBgComp = ({ title, description, buttonText }) => {

  return (
    <>
        <Heading title={title} width={75} className={window.innerWidth > 767 ? 'light' : 'fs-36 light w-80'}  description={description} descriptionClassName="light" />

        <button className="cs-btn light">{buttonText} <i className="fa-regular fa-arrow-right"></i></button>
    </>
  )
}

export default FixedBgComp