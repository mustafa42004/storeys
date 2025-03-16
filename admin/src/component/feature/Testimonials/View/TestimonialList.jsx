import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetch as fetchTestimonials,
  deleteProperty as deleteTestimonial,
} from "../../../../services/TestimonialService";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Spinner from "../../../shared/Spinner/Spinner";
import Pagination from "../../../shared/Pagination/Pagination";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const getTestimonials = async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchTestimonials(page, limit);

      if (response.success || response.status === "success") {
        setTestimonials(response?.data?.docs || []);

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
        setError(response.message || "Failed to fetch testimonials");
        toast.error(response.message || "Failed to fetch testimonials");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setError("An unexpected error occurred while fetching testimonials");
      toast.error("An unexpected error occurred while fetching testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    getTestimonials(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit) => {
    getTestimonials(1, newLimit);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    setIsDeleting(true);
    setDeleteId(id);

    try {
      const response = await deleteTestimonial(id);

      // Check for success in the response
      if (
        response.success ||
        response.status == "204" ||
        response.data?.success
      ) {
        toast.success("Testimonial deleted successfully");

        // Refresh the data from the API
        await getTestimonials(pagination.page, pagination.limit);

        // If we're on a page with only one item and it's deleted, go to previous page
        if (testimonials.length === 1 && pagination.page > 1) {
          await getTestimonials(pagination.page - 1, pagination.limit);
        }
      } else {
        toast.error(response.message || "Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("An unexpected error occurred while deleting testimonial");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    getTestimonials(pagination.page, pagination.limit);
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-${i <= rating ? "solid" : "regular"} fa-star ${
            i <= rating ? "text-warning" : "text-muted"
          }`}
          style={{ fontSize: "12px" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>Testimonials</h5>
                  <NavLink
                    to="/create-testimonial"
                    className="btn bg-gradient-info"
                  >
                    <i className="fa-solid fa-plus" /> &nbsp; Add Testimonial
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive p-0">
                  {isLoading ? (
                    <div className="text-center py-5">
                      <Spinner />
                      <p className="mt-3">Loading testimonials...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">
                      {error}
                      <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={() =>
                          getTestimonials(pagination.page, pagination.limit)
                        }
                      >
                        Retry
                      </button>
                    </div>
                  ) : testimonials.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fa-solid fa-comments fa-3x text-muted mb-3"></i>
                      <p>No testimonials found</p>
                      <NavLink
                        to="/create-testimonial"
                        className="btn btn-sm btn-primary"
                      >
                        Add Your First Testimonial
                      </NavLink>
                    </div>
                  ) : (
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Client
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Message
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Rating
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Date
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonials.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  {item.image?.s3Url ? (
                                    <img
                                      src={item.image.s3Url}
                                      className="avatar avatar-sm me-3 rounded-circle"
                                      alt={item.name}
                                    />
                                  ) : (
                                    <div className="avatar avatar-sm me-3 bg-gradient-primary rounded-circle">
                                      <span className="text-white text-uppercase">
                                        {item.name?.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{item.name}</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.location}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p
                                className="text-xs text-wrap mb-0"
                                style={{ maxWidth: "300px" }}
                              >
                                {item.message?.length > 100
                                  ? `${item.message.substring(0, 100)}...`
                                  : item.message}
                              </p>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex justify-content-center">
                                {renderStars(item.rating)}
                              </div>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {item.createdAt
                                  ? format(
                                      new Date(item.createdAt),
                                      "dd/MM/yyyy"
                                    )
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <NavLink
                                to={`/edit-testimonial/${item._id}`}
                                className="text-primary font-weight-bold text-xs me-3"
                                data-toggle="tooltip"
                                data-original-title="Edit testimonial"
                              >
                                <i className="fa-solid fa-pen-to-square me-1"></i>
                                Edit
                              </NavLink>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-danger font-weight-bold text-xs border-0 bg-transparent"
                                disabled={isDeleting && deleteId === item._id}
                                data-toggle="tooltip"
                                data-original-title="Delete testimonial"
                              >
                                {isDeleting && deleteId === item._id ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm me-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <i className="fa-solid fa-trash me-1"></i>
                                    Delete
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {!isLoading && !error && pagination.totalDocs > 0 && (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialList;
