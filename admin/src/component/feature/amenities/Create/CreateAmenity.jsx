import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner/Spinner";
import { create, update, fetchById } from "../../../../services/AmenityService";
import * as Yup from "yup";

const CreateAmenity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Amenity name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  // Fetch amenity data if in edit mode
  useEffect(() => {
    if (id) {
      fetchAmenity();
    }
  }, [id]);

  const fetchAmenity = async () => {
    if (!id) return;

    setFetchLoading(true);
    try {
      const response = await fetchById(id);
      if (response.success || response.status === "success") {
        formik.setValues({
          name: response.data.name || "",
        });
      } else {
        toast.error(response.message || "Could not fetch amenity details");
      }
    } catch (error) {
      console.error("Error fetching amenity:", error);
      toast.error("An unexpected error occurred while fetching the amenity");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const formData = { name: values.name };

      let response;

      if (id) {
        // Update existing amenity
        response = await update({
          id: id,
          formData: formData,
        });
      } else {
        // Create new amenity
        response = await create(formData);
      }

      if (response.success || response.status === "success") {
        toast.success(`Amenity ${id ? "updated" : "created"} successfully!`);
        navigate("/amenity");
      } else {
        toast.error(
          response.message || `Failed to ${id ? "update" : "create"} amenity`
        );
      }
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} amenity:`, error);
      toast.error(
        `An unexpected error occurred while ${
          id ? "updating" : "creating"
        } the amenity`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header pb-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{id ? "Edit" : "Create"} Amenity</h5>
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="btn btn-primary"
                disabled={isLoading || fetchLoading}
              >
                {isLoading ? <Spinner /> : "Save"}
              </button>
            </div>
            <div className="card-body">
              {fetchLoading ? (
                <div className="text-center py-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading amenity data...</p>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="amenityName" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="amenityName"
                          name="name"
                          placeholder="Amenity Name"
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
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAmenity;
