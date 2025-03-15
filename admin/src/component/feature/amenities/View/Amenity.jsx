// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useState, useEffect, useCallback } from "react";
import { formateDate } from "../../../../util/formateDate";
import { fetch as fetchAmenities } from "../../../../services/AmenityService";
import { toast } from "react-toastify";
import Pagination from "../../../shared/Pagination/Pagination";

const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const getAmenities = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAmenities(page, limit);

      if (response.success || response.status === "success") {
        console.log(response);
        setAmenities(response?.data?.docs || []);

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
        setError(response.message || "Failed to fetch amenities");
        toast.error(response.message || "Failed to fetch amenities");
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching amenities:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAmenities(pagination.page, pagination.limit);
  }, [getAmenities]);

  const handlePageChange = (newPage) => {
    if (newPage !== pagination.page) {
      getAmenities(newPage, pagination.limit);
    }
  };

  const handleLimitChange = (newLimit) => {
    if (newLimit !== pagination.limit) {
      getAmenities(1, newLimit);
    }
  };

  const handleRetry = () => {
    getAmenities(pagination.page, pagination.limit);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>Amenity table</h5>
                  <NavLink
                    to="/create-amenity"
                    className="btn bg-gradient-info"
                  >
                    <i className="fa-solid fa-plus" /> &nbsp; Add Amenity
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
                ) : error ? (
                  <div
                    className="alert alert-danger text-white text-center"
                    role="alert"
                  >
                    <p>{error}</p>
                    <button
                      className="btn btn-outline-light mt-3"
                      onClick={handleRetry}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Amenity Name
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Created Date
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {amenities?.length > 0 ? (
                            amenities.map((amenity, index) => (
                              <tr key={amenity._id || index}>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                    {amenity?.name}
                                  </p>
                                </td>
                                <td className="align-middle text-center">
                                  <span className="text-secondary text-xs font-weight-bold">
                                    {formateDate(
                                      amenity?.createdAt || amenity?.createdDate
                                    )}
                                  </span>
                                </td>
                                <td className="align-middle flex-cs gap-3 text-center text-center">
                                  <NavLink
                                    to={`/edit-amenity/${amenity?._id}`}
                                    className="btn btn-success btn m-0 font-weight-bold text-xs"
                                    data-toggle="tooltip"
                                    data-original-title="Edit amenity"
                                  >
                                    Edit
                                  </NavLink>
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-amenity"
                                    onClick={() => setSelectedAmenity(amenity)}
                                    className="btn-danger btn m-0 font-weight-bold text-xs"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center py-4">
                                No amenities found
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
        amenity={selectedAmenity}
        onDeleteSuccess={() => getAmenities(pagination.page, pagination.limit)}
      />
    </>
  );
};

export default Amenity;
