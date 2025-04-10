
const InfoSection = ({ data }) => {
  return (
    <>
        <div className="contact-info-section abs">
            {
                data?.map((item, index) => (
                    <a href={item.link} className="item" key={index} target="_blank">
                        <img src={item.icon} alt="" className="icon" />
                        <div className="content">
                            <h6 className="font-sm text-left fs-18 dark fw-600 ">{item.title}</h6>
                            <p className="font-sm text-left fs-18 dark">{item.value}</p>
                        </div>
                    </a>
                ))
            }
        </div>  
    </>
  )
}

export default InfoSection