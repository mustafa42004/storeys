import Pill from "./Helpers/Pill";
import Center from "./Helpers/Center";

const Thumbnail = ({ name, img, price, bed, bath, sqft, status }) => {
  return (
    <>
      <div className="thumbnail-card">
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
          <div
            className="top"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h4
              className="font-sm text-left dark bold"
              style={{
                maxWidth: "60%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name || "Property Name"}
            </h4>
            <h4
              className="font-sm text-left font-atyp dark bold"
              style={{ flex: "0 0 auto" }}
            >
              {price || "Price"} AED
            </h4>
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
  );
};

export default Thumbnail;
