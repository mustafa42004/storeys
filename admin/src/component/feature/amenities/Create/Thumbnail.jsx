import Pill from "./Helpers/Pill"
import Center from "./Helpers/Center"

const Thumbnail = ({ name, img, price, bed, bath, sqft, status }) => {
  return (
    <>
        <div className="thumbnail-card" >
            <div className="banner">
                {img && (
                    <img
                        src={img}
                        alt="Main Banner Preview"
                        style={{ maxWidth: "100%" }}
                        />
                )}
                <Pill title={`For ${status}`} />
            </div>
            <div className="content">
                <div className="top">
                    <h4 className="font-sm text-left dark bold">{name || "Property Name"}</h4>
                    <h4 className="font-sm text-left font-atyp justify-self-end dark bold">{price || "Price"}AED</h4>
                </div>
                
                <Center bed={bed} bath={bath} sqft={sqft} />

                {/* <div className="bottom">
                    <div className="profile">
                        <img src="/assets/img/property-profile.svg" alt="" />
                    </div>
                    <h4 className="font-sm text-left fs-20 dark bold">Talan Culhane</h4>
                    <div className="buttons">
                        <button><img src="/assets/img/message.svg" alt="" /></button>
                        <button><img src="/assets/img/call.svg" alt="" /></button>
                    </div>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Thumbnail