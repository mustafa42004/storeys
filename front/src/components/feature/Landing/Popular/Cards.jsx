
const Cards = ({title, description, image}) => {
  return (
    <>
        <div className="cs-card">
            <div className="banner">
                <img src={image} alt="" />
            </div>
            <div className="content">
                <h4 className="font-lg text-left fs-18">{title}</h4>
                <p className="font-sm text-left">{description}</p>
            </div>
                <button className="cs-btn hover">Explore More <i className="fa-regular fa-arrow-right"></i></button>
        </div>
    </>
  )
}

export default Cards