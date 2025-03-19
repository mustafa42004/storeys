import { useState } from "react";
import { Modal } from "react-bootstrap";

const Overlay = ({ remainingCount, onShowLightbox }) => {
  return (
    <div className="overlay">
      <h4 className="font-sm light bold">See All Photos</h4>
      <button className="font-sm dark fs-20 medium" onClick={onShowLightbox}>
        +{remainingCount}
      </button>
    </div>
  );
};

const Banner = ({ banner, marginTop }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleShowLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const displayedImages =
    window.innerWidth > 767 ? banner?.slice(0, 8) : banner?.slice(0, 4);
  const remainingCount = banner?.length - displayedImages?.length;
  const imageUrls = banner?.map((item) => item.s3Url);

  return (
    <>
      <section
        className="property-inner-banner overflow-x-hidden"
        style={{ marginTop: `${marginTop}px` || "0px" }}
      >
        {displayedImages?.map((item, index) => (
          <div
            className="item"
            key={item.uniqueid}
            onClick={() => handleShowLightbox(index)}
          >
            <img src={item.s3Url} alt={item.s3Key} className="img-fluid" />
            {index === displayedImages.length - 1 && remainingCount > 0 && (
              <Overlay
                remainingCount={remainingCount}
                onShowLightbox={() => handleShowLightbox(index)}
              />
            )}
          </div>
        ))}
      </section>
      <Modal
        show={lightboxOpen}
        onHide={() => setLightboxOpen(false)}
        centered
        dialogClassName="mt-5"
      >
        <Modal.Header closeButton />
        <Modal.Body className="text-center overflow-x-hidden">
          <img
            src={imageUrls?.[photoIndex]}
            alt="Lightbox"
            className="img-fluid rounded"
          />
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setPhotoIndex(
                  (photoIndex + imageUrls?.length - 1) % imageUrls?.length
                )
              }
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                setPhotoIndex((photoIndex + 1) % imageUrls?.length)
              }
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Banner;
