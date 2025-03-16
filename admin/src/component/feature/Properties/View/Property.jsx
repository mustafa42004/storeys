import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { formateDate } from "../../../../util/formateDate";
import {
  fetch as fetchProperties,
  toggleFeatured,
} from "../../../../services/PropertyService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../shared/Pagination/Pagination";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [featuringProperty, setFeaturingProperty] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const getProperties = async (page = 1, limit = 10) => {
    setIsLoading(true);
    const response = await fetchProperties(page, limit);

    if (response.success || response.status === "success") {
      setProperties(response?.data?.docs || []);

      // Update pagination state
      setPagination({
        page: response?.data?.page || 1,
        limit: response?.data?.limit || 10,
        totalDocs: response?.data?.totalDocs || 0,
        totalPages: response?.data?.totalPages || 0,
        hasPrevPage: response?.data?.hasPrevPage || false,
        hasNextPage: response?.data?.hasNextPage || false,
      });
    } else {
      toast.error(response.message || "Failed to fetch properties");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getProperties(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (newPage) => {
    getProperties(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit) => {
    getProperties(1, newLimit);
  };

  // Add function to handle toggling featured status
  const handleToggleFeatured = async (property) => {
    if (!property || !property._id) return;

    setFeaturingProperty(property._id);

    try {
      const response = await toggleFeatured(property._id);

      if (response.success || response.status === "success") {
        // Update the property in the local state
        const updatedProperties = properties.map((p) =>
          p._id === property._id ? { ...p, isFeatured: !p.isFeatured } : p
        );

        setProperties(updatedProperties);

        toast.success(
          `Property ${
            property.isFeatured ? "removed from" : "marked as"
          } featured successfully`
        );
      } else {
        toast.error(response.message || "Failed to update featured status");
      }
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setFeaturingProperty(null);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>Property table</h5>
                  <NavLink
                    to="/create-property"
                    className="btn bg-gradient-info"
                  >
                    <i className="fa-solid fa-plus" /> &nbsp; Add Property
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              S.No
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Image
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Property Name
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Area Name
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Status
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Is Featured
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Created At
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {properties.length > 0 ? (
                            properties.map((property, index) => (
                              <tr key={index}>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                    {index + 1}
                                  </p>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      <img
                                        src={property?.banner?.s3Url}
                                        className="avatar avatar-sm me-3"
                                        alt="property"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                    {property?.name}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                    {property?.city}
                                  </p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <span className="badge badge-sm bg-gradient-success">
                                    {property?.status}
                                  </span>
                                </td>
                                <td className="align-middle text-center">
                                  <span
                                    className={`badge badge-sm ${
                                      property?.isFeatured
                                        ? "bg-gradient-success"
                                        : "bg-gradient-secondary"
                                    }`}
                                  >
                                    {property?.isFeatured ? "Yes" : "No"}
                                  </span>
                                </td>
                                <td className="align-middle text-center">
                                  <span className="text-secondary text-xs font-weight-bold">
                                    {formateDate(
                                      property?.createdAt ||
                                        property?.createdDate
                                    )}
                                  </span>
                                </td>
                                <td className="align-middle flex-cs gap-3 text-center text-center">
                                  <NavLink
                                    to={`/edit-property/${property?._id}`}
                                    className="btn btn-success btn-sm m-0 font-weight-bold text-xs"
                                    data-toggle="tooltip"
                                    data-original-title="Edit user"
                                  >
                                    Edit
                                  </NavLink>
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-banner"
                                    onClick={() =>
                                      setSelectedProperty(property)
                                    }
                                    className="btn-danger btn btn-sm m-0 font-weight-bold text-xs"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleToggleFeatured(property)
                                    }
                                    className={`btn-${
                                      property?.isFeatured
                                        ? "secondary"
                                        : "warning"
                                    } btn btn-sm m-0 font-weight-bold text-xs`}
                                    disabled={
                                      featuringProperty === property?._id
                                    }
                                  >
                                    {featuringProperty === property?._id ? (
                                      <>
                                        <span
                                          className="spinner-border spinner-border-sm me-1"
                                          role="status"
                                          aria-hidden="true"
                                        ></span>
                                        Updating...
                                      </>
                                    ) : property?.isFeatured ? (
                                      "Unfeature"
                                    ) : (
                                      "Feature"
                                    )}
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center py-4">
                                No properties found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {pagination.totalDocs > 0 && (
                      <Pagination
                        page={pagination.page}
                        totalPages={pagination.totalPages}
                        hasPrevPage={pagination.hasPrevPage}
                        hasNextPage={pagination.hasNextPage}
                        totalDocs={pagination.totalDocs}
                        limit={pagination.limit}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        property={selectedProperty}
        onDeleteSuccess={() => getProperties(pagination.page, pagination.limit)}
      />
    </>
  );
};

export default Property;
