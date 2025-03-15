import { useFormik } from "formik";
import { useState, useEffect } from "react";
import {
  create,
  update,
  fetchById,
} from "../../../../services/PropertyService";
import Spinner from "../../../shared/Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Banners from "./Banners";
import Thumbnail from "./Thumbnail";
import {
  handlePostProperty,
  handleUpdateProperty,
} from "../../../../redux/PropertyDataSlice";
import { useDispatch, useSelector } from "react-redux";
import SharedDropdown from "../../../shared/SharedDropdown";
import {
  flatPropertyTypes,
  propertyCategories,
} from "../../../../constants/propertyTypes";
import dubaiAreas from "../../../../constants/dubaiAreas";
import { fetch as fetchAmenities } from "../../../../services/AmenityService";

const CreateProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const propertyData = useSelector(
    (state) => state.PropertyDataSlice.properties
  );

  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [removedImage, setRemovedImage] = useState([]);
  const [errors, setErrors] = useState({});
  const [mainBannerPreview, setMainBannerPreview] = useState("");
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    type: "",
    city: "",
    amenities: [],
    bedrooms: null,
    bathrooms: null,
    parking: null,
    price: null,
    sqft: null,
    propertyInfo: {
      type: "",
      purpose: "",
      reference: null,
      furnishing: "",
      createdDate: Date.now(),
    },
    buildingInfo: {
      name: "",
      floors: null,
      offices: null,
      sqft: null,
    },
    createdDate: Date.now(),
    status: "",
    banner: null,
  });

  useEffect(() => {
    getAmenities();

    if (id) {
      const property = propertyData.find((property) => property._id === id);
      if (property) {
        setMainBannerPreview(property?.banner?.s3Url);
        setInitialValues(property);
        setImages(property?.image);
        form.setValues(property);
      } else {
        fetchProperty();
      }
    }
  }, [id, propertyData]);

  const fetchProperty = async () => {
    setFetchLoading(true);
    try {
      const response = await fetchById(id);
      if (response?.success || response?.status === "success") {
        const property = response.data;
        setMainBannerPreview(property?.banner?.s3Url);
        setInitialValues(property);
        setImages(property?.image);
        form.setValues(property);
      } else {
        toast.error(response?.message || "Failed to fetch property details");
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      toast.error("Something went wrong while fetching property details");
    } finally {
      setFetchLoading(false);
    }
  };

  const validateFormData = (formData) => {
    const validationErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      validationErrors.name = "Property name is required";
    }

    if (!formData.city || formData.city.trim() === "") {
      validationErrors.city = "Area name is required";
    }

    if (!formData.type || formData.type.trim() === "") {
      validationErrors.type = "Property type is required";
    }

    if (!formData.address || formData.address.trim() === "") {
      validationErrors.address = "Property address is required";
    }

    if (!formData.price || formData.price <= 0) {
      validationErrors.price = "Valid property price is required";
    }

    return validationErrors;
  };

  const form = useFormik({
    initialValues,
    enableReinitialize: true, // Reinitialize form when initialValues change
    onSubmit: async (formData) => {
      // Validate form data
      const validationErrors = validateFormData(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        Object.values(validationErrors).forEach((error) => toast.error(error));
        return;
      }

      setErrors({});

      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("city", formData.city);
      formPayload.append("address", formData.address);
      formPayload.append("type", formData.type);
      formPayload.append("amenities", JSON.stringify(form.values.amenities));
      formPayload.append("createdDate", formData.createdDate);
      formPayload.append("status", formData.status);
      formPayload.append("banner", formData?.banner);
      formPayload.append(
        "propertyInfo",
        JSON.stringify(formData?.propertyInfo)
      );
      formPayload.append(
        "buildingInfo",
        JSON.stringify(formData?.buildingInfo)
      );
      formPayload.append("bedrooms", formData?.bedrooms);
      formPayload.append("bathrooms", formData?.bathrooms);
      formPayload.append("parking", formData?.parking);
      formPayload.append("price", formData?.price);
      formPayload.append("sqft", formData?.sqft);
      formPayload.append("description", "");

      if (removedImage.length > 0) {
        formPayload.append("removedImages", JSON.stringify(removedImage));
      }

      if (banners && banners.length > 0) {
        banners.forEach((banner) => {
          if (banner.banner) {
            formPayload.append("image", banner.banner);
          }
        });
      }

      setIsLoading(true);
      try {
        if (!id) {
          await onCreate(formPayload);
        } else {
          await onUpdate(formPayload);
        }
      } catch (error) {
        setIsLoading(false);
        const errorMessage =
          error?.message || "Something went wrong while saving the property!";
        toast.error(errorMessage);
        console.error("Property save error:", error);
      }
    },
  });

  const onCreate = async (formPayload) => {
    try {
      const response = await create(formPayload);

      if (response?.success || response?.status === "success") {
        dispatch(handlePostProperty(response?.result));
        navigate("/property");
        toast.success("Property created successfully!");
      } else {
        throw new Error(response.message || "Failed to create property");
      }
    } catch (error) {
      console.error("Error creating property:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (formPayload) => {
    try {
      const dataModel = {
        id,
        formData: formPayload,
      };

      const response = await update(dataModel);

      if (response?.success || response?.status === "success") {
        dispatch(handleUpdateProperty(response?.result));
        navigate("/property");
        toast.success("Property updated successfully!");
      } else {
        throw new Error(response.message || "Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle main banner upload
  const handleMainBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (maximum 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Banner image size should be less than 5MB");
        e.target.value = null;
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Please upload a valid image file (JPEG, PNG, SVG, or WEBP)"
        );
        e.target.value = null;
        return;
      }

      form.setFieldValue("banner", file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setMainBannerPreview(reader.result);
      reader.onerror = () => toast.error("Failed to read the selected file");
      reader.readAsDataURL(file);
    }
  };

  const fetchBanners = (data, removed) => {
    setBanners(data);
    setRemovedImage(removed);
  };

  const handleAmenityChange = (e) => {
    const selectedAmenityId = e.target.value;
    if (
      selectedAmenityId &&
      !form.values.amenities.includes(selectedAmenityId)
    ) {
      // Update Formik's state directly with the amenity ID
      const updatedAmenities = [...form.values.amenities, selectedAmenityId];
      form.setFieldValue("amenities", updatedAmenities);
    }
  };

  const removeAmenity = (amenityIdToRemove) => {
    const updatedAmenities = form.values.amenities.filter(
      (amenityId) => amenityId !== amenityIdToRemove
    );
    form.setFieldValue("amenities", updatedAmenities);
  };

  const formatDateForInput = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // Returns yyyy-MM-dd format
  };

  // Fetch amenities from API
  const getAmenities = async () => {
    setAmenitiesLoading(true);
    try {
      const response = await fetchAmenities(1, 100); // Fetch up to 100 amenities

      if (response.success || response.status === "success") {
        setAmenitiesList(response?.data?.docs || []);
      } else {
        toast.error(response.message || "Failed to fetch amenities");
      }
    } catch (error) {
      console.error("Error fetching amenities:", error);
      toast.error("Something went wrong while fetching amenities");
    } finally {
      setAmenitiesLoading(false);
    }
  };

  // Replace the amenity selection UI with this updated version
  const renderAmenitiesSection = () => {
    return (
      <div className="card my-3">
        <div className="card-header pt-4 pb-2">
          <h6>Amenities</h6>
        </div>
        <div className="card-body py-2">
          {amenitiesLoading ? (
            <div className="text-center py-3">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading amenities...</span>
              </div>
              <span className="ms-2">Loading amenities...</span>
            </div>
          ) : amenitiesList.length === 0 ? (
            <div className="alert alert-info">No amenities available</div>
          ) : (
            <>
              <select
                className="form-select mb-3"
                onChange={handleAmenityChange}
                value=""
              >
                <option value="">Select an amenity to add</option>
                {amenitiesList.map((amenity) => (
                  <option key={amenity._id} value={amenity._id}>
                    {amenity.name}
                  </option>
                ))}
              </select>

              {form.values.amenities && form.values.amenities.length > 0 ? (
                <div className="selected-amenities mt-3">
                  <h6 className="text-sm mb-2">Selected Amenities:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {form.values.amenities.map((amenityId) => {
                      const amenity = amenitiesList.find(
                        (a) => a._id === amenityId
                      );
                      return (
                        <div
                          key={amenityId}
                          className="badge bg-primary p-2 d-flex align-items-center"
                        >
                          <span>{amenity?.name || "Unknown amenity"}</span>
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            onClick={() => removeAmenity(amenityId)}
                            style={{ fontSize: "10px" }}
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-muted">No amenities selected</div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  if (fetchLoading) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner />
        <p className="ms-3">Loading property details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <form onSubmit={form.handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header pt-4 pb-2">
                  <h6>Thumbnail</h6>
                </div>
                <div className="card-body py-2">
                  <div className="my-3">
                    <input
                      type="text"
                      value={form.values?.name}
                      onChange={form.handleChange}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      name="name"
                      placeholder="Property Name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="my-3">
                    <input
                      type="file"
                      onChange={handleMainBannerUpload}
                      className="form-control"
                      name="banner"
                    />
                    {mainBannerPreview && (
                      <div className="mt-2">
                        <img
                          src={mainBannerPreview}
                          alt="Banner Preview"
                          style={{ maxHeight: "100px" }}
                          className="img-thumbnail"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="card my-3">
                <div className="card-header pt-4 pb-2">
                  <h6>Property Details</h6>
                </div>
                <div className="card-body py-2">
                  <div className="grid-cs gap-4">
                    <div className="">
                      <SharedDropdown
                        value={form.values?.city}
                        onChange={form.handleChange}
                        name="city"
                        placeholder="Area Name"
                        options={dubaiAreas}
                        className={errors.city ? "is-invalid" : ""}
                      />
                      {errors.city && (
                        <div className="text-danger small mt-1">
                          {errors.city}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <input
                        type="text"
                        value={form.values?.address}
                        onChange={form.handleChange}
                        className={`form-control ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        name="address"
                        placeholder="Property Address"
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                    <div className="">
                      <SharedDropdown
                        value={form.values?.type}
                        onChange={form.handleChange}
                        name="type"
                        placeholder="Select Property Type"
                        options={flatPropertyTypes}
                        className={errors.type ? "is-invalid" : ""}
                      />
                      {errors.type && (
                        <div className="text-danger small mt-1">
                          {errors.type}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.price ?? ""}
                        onChange={form.handleChange}
                        className={`form-control ${
                          errors.price ? "is-invalid" : ""
                        }`}
                        name="price"
                        placeholder="Property Price"
                      />
                      {errors.price && (
                        <div className="invalid-feedback">{errors.price}</div>
                      )}
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.bedrooms ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="bedrooms"
                        placeholder="Property Bedrooms"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.bathrooms ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="bathrooms"
                        placeholder="Property Bathrooms"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.parking ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="parking"
                        placeholder="Property Parking"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.sqft ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="sqft"
                        placeholder="Property Sqft"
                        id=""
                      />
                    </div>
                  </div>
                  {renderAmenitiesSection()}
                </div>
              </div>

              <div className="card my-3">
                <div className="card-header pt-4 pb-2">
                  <h6>Property Information</h6>
                </div>
                <div className="card-body py-3">
                  <div className="grid-cs gap-4">
                    <div className="">
                      <SharedDropdown
                        value={form.values?.propertyInfo?.type}
                        onChange={form.handleChange}
                        name="propertyInfo.type"
                        placeholder="Select Property Type"
                        options={flatPropertyTypes}
                      />
                    </div>
                    <div className="">
                      <SharedDropdown
                        value={form.values?.propertyInfo?.purpose}
                        onChange={form.handleChange}
                        name="propertyInfo.purpose"
                        placeholder="Select Property Purpose"
                        options={propertyCategories}
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.propertyInfo?.reference ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="propertyInfo.reference"
                        placeholder="Property Reference"
                        id=""
                      />
                    </div>
                    <div className="">
                      <SharedDropdown
                        value={form.values?.propertyInfo?.furnishing}
                        onChange={form.handleChange}
                        name="propertyInfo.furnishing"
                        placeholder="Select Property Furnishing"
                        options={["Furnished", "Semi-Furnished", "Unfurnished"]}
                      />
                    </div>
                    <div className="">
                      <input
                        type="date"
                        value={formatDateForInput(
                          form.values?.propertyInfo?.date
                        )}
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value).getTime()
                            : null;
                          form.setFieldValue("propertyInfo.date", date);
                        }}
                        className="form-control"
                        name="propertyInfo.date"
                        placeholder="Property Date"
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card my-3">
                <div className="card-header pt-4 pb-2">
                  <h6>Building Information</h6>
                </div>
                <div className="card-body py-3">
                  <div className="grid-cs gap-4">
                    <div className="">
                      <input
                        type="text"
                        value={form.values?.buildingInfo?.name}
                        onChange={form.handleChange}
                        className="form-control"
                        name="buildingInfo.name"
                        placeholder="Building Name"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.buildingInfo?.floors ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="buildingInfo.floors"
                        placeholder="Building Floors"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.buildingInfo?.sqft ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="buildingInfo.sqft"
                        placeholder="Building SQFT"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.buildingInfo?.offices ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="buildingInfo.offices"
                        placeholder="Building Offices"
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Banners
                savedBanners={id ? images : []}
                fetchBanners={fetchBanners}
              />
            </div>
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-header gtc-1-2 grid-cs">
                  <select
                    className="form-control"
                    name="status"
                    value={form.values?.status}
                    onChange={form.handleChange}
                    id="exampleFormControlSelect1"
                  >
                    <option value="">Status</option>
                    <option value="rent">For Rent</option>
                    <option value="sell">For sell</option>
                  </select>
                </div>
              </div>

              <Thumbnail
                img={mainBannerPreview}
                status={form.values?.status}
                name={form.values?.name}
                price={form.values?.price}
                bed={form.values?.bedrooms}
                bath={form.values?.bathrooms}
                sqft={form.values?.sqft}
              />

              <div className="fixed-bottom-button bg-white p-4">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn bg-gradient-primary"
                >
                  {isLoading ? (
                    <span>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {id ? "Updating..." : "Creating..."}
                    </span>
                  ) : (
                    <span>{id ? "Update Property" : "Create Property"}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProperty;
