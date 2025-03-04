
const InfoSection = ({ data }) => {
  return (
    <>
        <div className="contact-info-section abs">
            {
                data?.map((item, index) => (
                    <div className="item" key={index}>
                        <img src={item.icon} alt="" className="icon" />
                        <div className="content">
                            <h6 className="font-sm text-left fs-20 dark fw-600 ">{item.title}</h6>
                            <p className="font-sm text-left fs-20 dark">{item.value}</p>
                        </div>
                    </div>
                ))
            }
        </div>  
    </>
  )
}

export default InfoSection