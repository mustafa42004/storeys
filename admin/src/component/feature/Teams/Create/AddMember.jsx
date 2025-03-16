import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const AddMember = ({ onDataChange, teamData, errors, touched }) => {
  const fileInputRef = useRef(null);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    profile: {
      file: null,
      preview: null,
    },
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [shouldUpdateParent, setShouldUpdateParent] = useState(false);

  // Only set initial data once when teamData changes
  useEffect(() => {
    if (teamData) {
      setData(teamData);
      setIsUpdated(true);
    }
  }, [teamData]);

  const profileUpload = (e) => {
    const file = e.target.files[0];
    setFileError(null);

    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        setFileError("Please upload a valid image file (JPEG, PNG, GIF, WEBP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError("Image size must be less than 5MB");
        return;
      }

      const newData = {
        ...data,
        profile: {
          ...data.profile,
          file: file,
        },
      };

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        newData.profile.preview = reader.result;
        setData(newData);
        setShouldUpdateParent(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // IMPORTANT: This is what was causing the infinite loop - now fixed
  // Only call onDataChange when explicitly triggered, not on every render
  useEffect(() => {
    if (shouldUpdateParent) {
      onDataChange(data);
      setShouldUpdateParent(false);
    }
  }, [shouldUpdateParent]); // FIXED: Removed data and onDataChange from dependencies

  // Update the handlers to set the update flag
  const handleInputChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setShouldUpdateParent(true);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center py-3 bg-light">
        <h5 className="mb-0 text-primary">
          {isUpdated
            ? `Edit Team Member: ${data?.firstName} ${data?.lastName}`
            : "Add New Team Member"}
        </h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="text-center mb-3">
              <div
                onClick={() => fileInputRef?.current?.click()}
                className="position-relative mx-auto"
                style={{
                  width: "200px",
                  height: "200px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px dashed #ccc",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {data?.profile?.preview ? (
                  <img
                    src={data?.profile?.preview}
                    alt="Member preview"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : data?.profile?.s3Url ? (
                  <img
                    src={data?.profile?.s3Url}
                    alt="Member"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <i className="fa-solid fa-user-plus fa-2xl text-secondary"></i>
                    <p className="mt-2 mb-0 small text-muted">
                      Click to upload photo
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={profileUpload}
                className="d-none"
                accept="image/*"
              />
              {fileError && (
                <div className="text-danger small mt-2">{fileError}</div>
              )}
              <div className="mt-2">
                <small className="text-muted">
                  Click to upload a profile picture (Max: 5MB)
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={data?.firstName || ""}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter First Name"
                  className={`form-control ${
                    touched?.firstName && errors?.firstName ? "is-invalid" : ""
                  }`}
                />
                {touched?.firstName && errors?.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={data?.lastName || ""}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter Last Name"
                  className={`form-control ${
                    touched?.lastName && errors?.lastName ? "is-invalid" : ""
                  }`}
                />
                {touched?.lastName && errors?.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="designation" className="form-label">
                  Designation *
                </label>
                <textarea
                  id="designation"
                  rows={3}
                  value={data?.designation || ""}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  placeholder="Enter Designation (e.g., Senior Developer, Marketing Manager)"
                  className={`form-control ${
                    touched?.designation && errors?.designation
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {touched?.designation && errors?.designation && (
                  <div className="invalid-feedback">{errors.designation}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
