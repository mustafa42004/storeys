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
                    <img src="/assets/img/property-profile.svg" alt="" />
                    <h4 className="font-lg dark">Rohit Mehta</h4>
                </div>
                <div className="grid-cs w-100">
                    <button className="cs-btn fs-14 card-btn"><i class="fa-solid fa-lg fa-gem"></i> Quality Lister</button>
                    <button className="cs-btn fs-14 colored card-btn"><i class="fa-solid fa-lg fa-phone"></i> Responsive Broker</button>
                </div>
                <div className="grid-cs gtc-3 mob w-100">
                    <button className="contact-btn"><i class="fa-solid fa-lg fa-envelope"></i> Email</button>
                    <button className="contact-btn"><i class="fa-solid fa-lg fa-phone"></i> Call</button>
                    <button className={ `${isMobile ? "py-4" : 'auto'} contact-btn`}><i class="fa-brands fa-xl fa-whatsapp"></i></button>
                </div>
            </div>
            <div className="cs-footer">
                <h4 className="font-sm dark">Rocky Real Estate</h4>
            </div>
        </div>
    </>
  )
}

export default ProfileCard