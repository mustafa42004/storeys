import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill theme
import { create, update, fetchById } from "../../../../services/NewsService";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../../shared/Spinner/Spinner";

const CreateNews = () => {
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const isEditMode = !!id;

  // Updated validation schema to require banner for new news
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    permalink: Yup.string().required("Permalink is required"),
    status: Yup.string().required("Status is required"),
    banner: isEditMode
      ? Yup.mixed()
      : Yup.mixed().required("Banner image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      permalink: "",
      status: "draft",
      banner: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Check if banner is required but not provided
      if (!isEditMode && !values.banner) {
        formik.setFieldError("banner", "Please provide a banner image");
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("permalink", values.permalink);
      formData.append("content", values.content);
      formData.append("status", values.status);

      if (values.banner && typeof values.banner !== "string") {
        formData.append("banner", values.banner);
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
              ? "News updated successfully!"
              : "News created successfully!"
          );
          navigate("/news");
        } else {
          // Check for specific error messages from the API
          if (response.message?.toLowerCase().includes("banner")) {
            formik.setFieldError(
              "banner",
              response.message || "Banner image is required"
            );
          } else {
            toast.error(response.message || "Failed to save news");
          }
        }
      } catch (error) {
        console.error("Error saving news:", error);
        // Check if the error is related to the banner
        if (error.response?.data?.message?.toLowerCase().includes("banner")) {
          formik.setFieldError(
            "banner",
            error.response.data.message || "Banner image is required"
          );
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Fetch news data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const getNewsById = async () => {
        setFetchLoading(true);
        try {
          const response = await fetchById(id);

          if (response.success || response.status === "success") {
            const newsData = response.data;

            formik.setValues({
              title: newsData.title || "",
              content: newsData.content || "",
              permalink: newsData.permalink || "",
              status: newsData.status || "draft",
              banner: newsData.banner?.s3Url || null,
            });

            if (newsData.banner?.s3Url) {
              setBannerPreview(newsData.banner.s3Url);
            }
          } else {
            toast.error(response.message || "Failed to fetch news data");
            navigate("/news");
          }
        } catch (error) {
          console.error("Error fetching news:", error);
          toast.error("An unexpected error occurred while fetching news data");
          navigate("/news");
        } finally {
          setFetchLoading(false);
        }
      };

      getNewsById();
    }
  }, [id, isEditMode, navigate]);

  const handleContentChange = (content) => {
    formik.setFieldValue("content", content);
  };

  const handleBannerChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Please select a valid image file (JPEG, JPG, PNG, GIF, WEBP)"
        );
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      formik.setFieldValue("banner", file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const setTitlePermalink = (event) => {
    const title = event.target.value;
    const permalink = title
      .toLowerCase()
      .split(" ")
      .filter((word) => word)
      .join("-");
    formik.setFieldValue("title", title);
    formik.setFieldValue("permalink", permalink);
  };

  const permalinkFormat = (event) => {
    const value = event.target.value;
    const permalink = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    formik.setFieldValue("permalink", permalink);
  };

  if (fetchLoading) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center py-5">
            <Spinner />
            <p className="mt-3">Loading news data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>{isEditMode ? "Edit News" : "Create News"}</h4>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => navigate("/news")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" /> Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>

            <div className="card my-3">
              <div className="card-header">
                <h5>News Details</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="News Title"
                      value={formik.values.title}
                      onChange={setTitlePermalink}
                      className={`form-control ${
                        formik.touched.title && formik.errors.title
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="invalid-feedback">
                        {formik.errors.title}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="permalink" className="form-label">
                      Permalink
                    </label>
                    <input
                      type="text"
                      id="permalink"
                      name="permalink"
                      placeholder="news-permalink"
                      value={formik.values.permalink}
                      onChange={permalinkFormat}
                      className={`form-control ${
                        formik.touched.permalink && formik.errors.permalink
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.permalink && formik.errors.permalink && (
                      <div className="invalid-feedback">
                        {formik.errors.permalink}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.status && formik.errors.status
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="">Select Status</option>
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                      <option value="published">Published</option>
                    </select>
                    {formik.touched.status && formik.errors.status && (
                      <div className="invalid-feedback">
                        {formik.errors.status}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="banner" className="form-label">
                      Banner Image{" "}
                      {!isEditMode && <span className="text-danger">*</span>}
                    </label>
                    <input
                      type="file"
                      id="banner"
                      name="banner"
                      accept="image/*"
                      onChange={handleBannerChange}
                      className={`form-control ${
                        formik.touched.banner && formik.errors.banner
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.banner && formik.errors.banner && (
                      <div className="invalid-feedback">
                        {formik.errors.banner}
                      </div>
                    )}
                    <small className="text-muted">
                      Recommended size: 1200x630px, Max: 5MB
                    </small>
                  </div>
                </div>

                {bannerPreview && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="position-relative">
                        <img
                          src={bannerPreview}
                          alt="Banner Preview"
                          className="img-fluid rounded"
                          style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                          onClick={() => {
                            setBannerPreview(null);
                            formik.setFieldValue("banner", null);
                          }}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card my-3">
              <div className="card-header">
                <h5>Content</h5>
              </div>
              <div className="card-body">
                <div className="blog-editor p-0 m-0">
                  <ReactQuill
                    value={formik.values.content}
                    onChange={handleContentChange}
                    placeholder="Write your news content here..."
                    modules={modules}
                    formats={formats}
                    className={
                      formik.touched.content && formik.errors.content
                        ? "is-invalid"
                        : ""
                    }
                  />
                  {formik.touched.content && formik.errors.content && (
                    <div className="text-danger mt-2">
                      {formik.errors.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "color",
  "background",
  "align",
  "link",
  "image",
  "video",
];

export default CreateNews;
