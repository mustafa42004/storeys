import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner/Spinner";

const CreateAmenity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  // Fetch amenity data if in edit mode
  useEffect(() => {
    const fetchAmenity = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await axios.get(`/api/amenity/${id}`);
        if (response.data) {
          setInitialValues({
            name: response.data.name,
            status: response.data.status || "Active",
          });
        }
      } catch (error) {
        console.error("Error fetching amenity:", error);
        toast.error("Could not fetch amenity details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmenity();
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);

      setIsLoading(true);

      try {
        let response;

        if (id) {
          // Update existing amenity
          response = await axios.put(`/api/amenity/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Amenity updated successfully!");
        } else {
          // Create new amenity
          response = await axios.post("/api/amenity", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Amenity created successfully!");
        }

        navigate("/admin/amenities");
      } catch (error) {
        console.error(`Error ${id ? "updating" : "creating"} amenity:`, error);
        toast.error(`Failed to ${id ? "update" : "create"} amenity`);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>{id ? "Edit" : "Create"} Amenity</h4>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Save"}
              </button>
            </div>

            <div className="card">
              <div className="card-header">
                <h5>Amenity Details</h5>
              </div>
              <div className="card-body">
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
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAmenity;
