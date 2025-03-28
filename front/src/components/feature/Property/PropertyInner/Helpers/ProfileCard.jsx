import { useEffect, useState } from "react"

const ProfileCard = () => {
    const [ isMobile , setIsMobile] = useState(false)

    useEffect(() => {
        window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
    }, [])
  return (
    <>
        <div className="profile-card">
            <div className="cs-banner">
                <div className="image"></div>
            </div>
            <div className="cs-body">
                <div className="profile">
                    <img src="/assets/img/business-man-smile.svg" alt="" />
                    <h4 className="font-lg dark">Rohit Mehta</h4>
                </div>
                <div className="grid-cs w-100">
                    <button className="cs-btn fs-14 card-btn"><i className="fa-solid fa-lg fa-gem"></i> Quality Lister</button>
                    <button className="cs-btn fs-14 colored card-btn"><i className="fa-solid fa-lg fa-phone"></i> Responsive Broker</button>
                </div>
                <div className="grid-cs gtc-3 mob w-100">
                    <a className="contact-btn"><img src="../../assets/img/email-icon.svg" />Email</a>
                    <a className="contact-btn"><img src="../../assets/img/call-icon.svg" />Call</a>
                    <a className={ `${isMobile ? "py-4" : 'auto'} contact-btn`}><img src="../../assets/img/whatsapp-icon.svg" /></a>
                </div>
            </div>
            {/* <div className="cs-footer">
                <h4 className="font-sm dark">Rocky Real Estate</h4>
            </div> */}
        </div>
    </>
  )
}

export default ProfileCard