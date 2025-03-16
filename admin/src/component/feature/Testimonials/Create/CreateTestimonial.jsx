import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  create,
  update,
  fetchById,
} from "../../../../services/TestimonialService";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../shared/Spinner/Spinner";

const CreateTestimonial = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const isEditMode = !!id;

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
    image: isEditMode
      ? Yup.mixed()
      : Yup.mixed().required("Profile image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      rating: 5,
      message: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Check if image is required but not provided
      if (!isEditMode && !values.image) {
        formik.setFieldError("image", "Please provide a profile image");
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("rating", values.rating);
      formData.append("message", values.message);

      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      }

      try {
        let response;

        if (isEditMode) {
          response = await update({ id, formData });
        } else {
          response = await create(formData);
        }

        if (response.success || response.status === "success") {
          toast.success(
            isEditMode
              ? "Testimonial updated successfully!"
              : "Testimonial created successfully!"
          );
          navigate("/testimonials");
        } else {
          // Check for specific error messages from the API
          if (response.message?.toLowerCase().includes("image")) {
            formik.setFieldError(
              "image",
              response.message || "Profile image is required"
            );
          } else {
            toast.error(response.message || "Failed to save testimonial");
          }
        }
      } catch (error) {
        console.error("Error saving testimonial:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Fetch testimonial data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const getTestimonialById = async () => {
        setFetchLoading(true);
        try {
          const response = await fetchById(id);

          if (response.success || response.status === "success") {
            const testimonialData = response.data;

            formik.setValues({
              name: testimonialData.name || "",
              location: testimonialData.location || "",
              rating: testimonialData.rating || 5,
              message: testimonialData.message || "",
              image: testimonialData.image?.s3Url || null,
            });

            if (testimonialData.image?.s3Url) {
              setImagePreview(testimonialData.image.s3Url);
            }
          } else {
            toast.error(response.message || "Failed to fetch testimonial data");
            navigate("/testimonials");
          }
        } catch (error) {
          console.error("Error fetching testimonial:", error);
          toast.error(
            "An unexpected error occurred while fetching testimonial data"
          );
          navigate("/testimonials");
        } finally {
          setFetchLoading(false);
        }
      };

      getTestimonialById();
    }
  }, [id, isEditMode, navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

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
        formik.setFieldError(
          "image",
          "Please upload a valid image file (JPEG, PNG, GIF, WEBP)"
        );
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        formik.setFieldError("image", "Image size must be less than 5MB");
        return;
      }

      formik.setFieldValue("image", file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center py-5">
          <Spinner />
          <p className="mt-3">Loading testimonial data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12 col-md-8 mx-auto">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    {isEditMode ? "Edit Testimonial" : "Create New Testimonial"}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm mb-0"
                    onClick={() => navigate("/testimonials")}
                  >
                    Back to List
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="name" className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter full name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label htmlFor="location" className="form-label">
                      Location <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="City, Country"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.location && formik.errors.location
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.location && formik.errors.location && (
                      <div className="invalid-feedback">
                        {formik.errors.location}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="rating" className="form-label">
                      Rating <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex align-items-center">
                      <input
                        type="range"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        step="1"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        className="form-range me-3 w-75"
                      />
                      <div className="rating-display border rounded px-3 py-2">
                        {formik.values.rating} / 5
                        <div className="stars mt-1">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fa-${
                                i < formik.values.rating ? "solid" : "regular"
                              } fa-star ${
                                i < formik.values.rating
                                  ? "text-warning"
                                  : "text-muted"
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    {formik.touched.rating && formik.errors.rating && (
                      <div className="text-danger small">
                        {formik.errors.rating}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label htmlFor="image" className="form-label">
                      Profile Image{" "}
                      {!isEditMode && <span className="text-danger">*</span>}
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={`form-control ${
                        formik.touched.image && formik.errors.image
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="invalid-feedback">
                        {formik.errors.image}
                      </div>
                    )}
                    <small className="text-muted">
                      Recommended size: 400x400px, Max: 5MB
                    </small>
                  </div>
                </div>

                {imagePreview && (
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="position-relative">
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                          onClick={() => {
                            setImagePreview(null);
                            formik.setFieldValue("image", null);
                          }}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-12 mb-4">
                    <label htmlFor="message" className="form-label">
                      Testimonial Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Enter testimonial message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.message && formik.errors.message
                          ? "is-invalid"
                          : ""
                      }`}
                    ></textarea>
                    {formik.touched.message && formik.errors.message && (
                      <div className="invalid-feedback">
                        {formik.errors.message}
                      </div>
                    )}
                    <small className="text-muted">
                      Minimum 10 characters required
                    </small>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => navigate("/testimonials")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn bg-gradient-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {isEditMode ? "Updating..." : "Creating..."}
                          </>
                        ) : (
                          <>
                            {isEditMode
                              ? "Update Testimonial"
                              : "Create Testimonial"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTestimonial;
