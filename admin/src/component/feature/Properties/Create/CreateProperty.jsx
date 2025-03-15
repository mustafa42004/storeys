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
import Content from "./Content";
import Thumbnail from "./Thumbnail";
import {
  handlePostProperty,
  handleUpdateProperty,
} from "../../../../redux/PropertyDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { amenities as amenitiesList } from "../../amenities/View/Amenity";

const CreateProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const propertyData = useSelector(
    (state) => state.PropertyDataSlice.properties
  );

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [removedImage, setRemovedImage] = useState([]);
  const [content, setContent] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [mainBannerPreview, setMainBannerPreview] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    type: "",
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
  }, [id, propertyData]); // Dependency on propertyData to refetch if not found

  const fetchProperty = async () => {
    try {
      const response = await fetchById(id);
      if (response?.success) {
        const property = response.data;
        setMainBannerPreview(property?.banner?.s3Url);
        setInitialValues(property);
        setImages(property?.image);
        form.setValues(property);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      toast.error("Something went wrong");
    }
  };

  const form = useFormik({
    initialValues,
    enableReinitialize: true, // Reinitialize form when initialValues change
    onSubmit: async (formData) => {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
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
      formPayload.append("description", JSON.stringify(content));

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
          onCreate(formPayload);
        } else {
          onUpdate(formPayload);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong !!");
      }
    },
  });

  const onCreate = async (formPayload) => {
    const response = await create(formPayload);
    if (response.success) {
      dispatch(handlePostProperty(response?.result));
      setIsLoading(false);
      navigate("/property");
      toast.success("Property is Created !!");
    } else {
      setIsLoading(false);
      toast.error("Something went wrong !!");
    }
  };

  const onUpdate = async (formPayload) => {
    const dataModel = {
      id,
      formData: formPayload,
    };
    const response = await update(dataModel);
    if (response.success) {
      dispatch(handleUpdateProperty(response?.result));
      setIsLoading(false);
      navigate("/property");
      toast.success("Property is Updated !!");
    } else {
      setIsLoading(false);
      toast.error("Something went wrong !!");
    }
  };

  // Handle main banner upload
  const handleMainBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setFieldValue("banner", file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setMainBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fetchBanners = (data, removed) => {
    setBanners(data);
    setRemovedImage(removed);
  };

  const fetchContent = (data) => {
    setContent(data);
  };

  const handleAmenityChange = (e) => {
    const selectedAmenity = e.target.value;
    if (selectedAmenity && !form.values.amenities.includes(selectedAmenity)) {
      // Update Formik's state directly instead of initialValues
      const updatedAmenities = [...form.values.amenities, selectedAmenity];
      form.setFieldValue("amenities", updatedAmenities);
    }
  };

  const removeAmenity = (amenityToRemove) => {
    const updatedAmenities = form.values.amenities.filter(
      (amenity) => amenity !== amenityToRemove
    );
    form.setFieldValue("amenities", updatedAmenities);
  };

  const formatDateForInput = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // Returns yyyy-MM-dd format
  };

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
                      className="form-control"
                      name="name"
                      placeholder="Property Name"
                      id=""
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="file"
                      onChange={handleMainBannerUpload}
                      className="form-control"
                      name="banner"
                      id=""
                    />
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
                      <input
                        type="text"
                        value={form.values?.city}
                        onChange={form.handleChange}
                        className="form-control"
                        name="city"
                        placeholder="City"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="text"
                        value={form.values?.address}
                        onChange={form.handleChange}
                        className="form-control"
                        name="address"
                        placeholder="Property Address"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="text"
                        value={form.values?.type}
                        onChange={form.handleChange}
                        className="form-control"
                        name="type"
                        placeholder="Property Type"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        value={form.values?.price ?? ""}
                        onChange={form.handleChange}
                        className="form-control"
                        name="price"
                        placeholder="Property Price"
                        id=""
                      />
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
                  <div className="tag-input-container my-3">
                    <h6>Amenities</h6>
                    <div className="d-flex flex-column gap-3">
                      <select
                        className="form-control"
                        onChange={handleAmenityChange}
                        value=""
                      >
                        <option value="">Select Amenity</option>
                        {amenitiesList.map((amenity, index) => (
                          <option
                            key={index}
                            value={amenity.name}
                            disabled={form.values.amenities.includes(
                              amenity.name
                            )}
                          >
                            {amenity.name}
                          </option>
                        ))}
                      </select>

                      <div className="selected-amenities d-flex flex-wrap gap-2">
                        {form.values.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="badge bg-primary d-flex align-items-center gap-2"
                          >
                            {amenity}
                            <button
                              type="button"
                              className="btn-close btn-close-white"
                              style={{ fontSize: "0.6rem" }}
                              onClick={() => removeAmenity(amenity)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card my-3">
                <div className="card-header pt-4 pb-2">
                  <h6>Property Information</h6>
                </div>
                <div className="card-body py-3">
                  <div className="grid-cs gap-4">
                    <div className="">
                      <input
                        type="text"
                        value={form.values?.propertyInfo?.type}
                        onChange={form.handleChange}
                        className="form-control"
                        name="propertyInfo.type"
                        placeholder="Property Type"
                        id=""
                      />
                    </div>
                    <div className="">
                      <input
                        type="text"
                        value={form.values?.propertyInfo?.purpose}
                        onChange={form.handleChange}
                        className="form-control"
                        name="propertyInfo.purpose"
                        placeholder="Property Purpose"
                        id=""
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
                      <input
                        type="text"
                        value={form.values?.propertyInfo?.furnishing}
                        onChange={form.handleChange}
                        className="form-control"
                        name="propertyInfo.furnishing"
                        placeholder="Property Furnishing"
                        id=""
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

              {/* <Content
                savedContent={id ? form.values?.description : []}
                fetchContent={fetchContent}
              /> */}
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
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg m-0"
                  >
                    Save Project {isLoading && <Spinner />}
                  </button>
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

              {/* <Preview /> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProperty;
