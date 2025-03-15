import React, { useEffect, useRef, useState } from "react";
import PreviewBannerModal from "./PreviewBannerModal";

const Banners = ({ fetchBanners, savedBanners }) => {
  const fileInputRef = useRef();

  const [banners, setBanners] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    if (savedBanners?.length > 0) {
      setSaved(savedBanners);
    }
  }, [savedBanners]);

  // Handle multiple file uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    // Create an array of promises for file reading
    const fileReadPromises = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            banner: file,
            preview: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    // Process all files and update state
    Promise.all(fileReadPromises).then((newBanners) => {
      setBanners([...banners, ...newBanners]);
    });

    // Reset file input
    e.target.value = null;
  };

  // Remove a specific banner
  const removeBanner = (index) => {
    const updatedBanners = [...banners];
    updatedBanners.splice(index, 1);
    setBanners(updatedBanners);
  };

  // Clear all banners
  const clearAllBanners = () => {
    setBanners([]);
  };

  // Update banners in parent component
  useEffect(() => {
    fetchBanners(banners, removed);
  }, [banners, removed]);

  return (
    <>
      <div className="card my-3">
        <div className="card-header pt-4 pb-2">
          <div className="flex-cs header">
            <h6>
              Add Banners
              <span data-tooltip="Preview">
                <button
                  className="cs-btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-banner"
                >
                  <i
                    className="fa-regular fa-lg fa-circle-info"
                    style={{ color: "#aaa" }}
                  />
                </button>
              </span>
            </h6>
          </div>
        </div>
        <div className="card-body py-2">
          <div className="projects-banners">
            {/* Previously saved banners */}
            {saved.length > 0 && (
              <div className="saved-banners mb-4">
                <h5 className="mb-3">Saved Banners</h5>
                <div className="banner-grid">
                  {saved?.map((value, index) => (
                    <div key={`saved-${index}`} className="banner-item">
                      <div className="banner-preview">
                        <img src={value.s3Url} alt={`Banner ${index + 1}`} />
                        <div className="banner-actions">
                          {removed.includes(value.s3Key) ? (
                            <button
                              type="button"
                              onClick={() =>
                                setRemoved(
                                  removed.filter((key) => key !== value.s3Key)
                                )
                              }
                              className="btn btn-sm bg-gradient-success"
                            >
                              Recover
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setRemoved([...removed, value.s3Key])
                              }
                              className="btn btn-sm bg-gradient-danger"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload interface */}
            <div className="upload-section mb-3">
              {/* <div className="d-flex justify-content-between align-items-center mb-3">
                {banners.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllBanners}
                    className="btn btn-sm bg-gradient-danger"
                  >
                    Clear All
                  </button>
                )}
              </div> */}

              <input
                className="d-none"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*"
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary py-3 px-5 mb-3 mx-auto"
                >
                  <i className="fa-solid fa-cloud-arrow-up me-2"></i>
                  Select Images
                </button>
              </div>
            </div>

            {/* Preview of uploaded banners */}
            {banners.length > 0 && (
              <div className="uploaded-banners">
                <h5 className="mb-3">New Banners ({banners.length})</h5>
                <div className="banner-grid">
                  {banners.map((banner, index) => (
                    <div key={`new-${index}`} className="banner-item">
                      <div className="banner-preview">
                        <img
                          src={banner.preview}
                          alt={`New Banner ${index + 1}`}
                        />
                        <div className="banner-actions">
                          <button
                            type="button"
                            onClick={() => removeBanner(index)}
                            className="btn btn-sm bg-gradient-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add CSS for the banner grid */}
      <style jsx>{`
        .banner-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }

        .banner-preview {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 16/9;
        }

        .banner-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner-actions {
          position: absolute;
          top: 0;
          right: 0;
          padding: 5px;
          background: rgba(0, 0, 0, 0.5);
          border-bottom-left-radius: 8px;
        }

        .banner-actions button {
          padding: 3px 8px;
          font-size: 0.7rem;
        }
      `}</style>

      <PreviewBannerModal img={"/assets/img/banner.JPG"} />
    </>
  );
};

export default Banners;
