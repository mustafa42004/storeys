import { useState, useEffect } from "react";
import { fetch as fetchCareers } from "../../../services/CareerService";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Pagination from "../../shared/Pagination/Pagination";
import * as XLSX from "xlsx";

const ListCareers = () => {
  const [careers, setCareers] = useState([]);
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

  const getCareers = async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchCareers(page, limit);

      if (response.success || response.status === "success") {
        setCareers(response?.data?.docs || []);

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
        setError(response.message || "Failed to fetch career applications");
        toast.error(response.message || "Failed to fetch career applications");
      }
    } catch (error) {
      console.error("Error fetching career applications:", error);
      setError(
        "An unexpected error occurred while fetching career applications"
      );
      toast.error(
        "An unexpected error occurred while fetching career applications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    getCareers(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit) => {
    getCareers(1, newLimit);
  };

  useEffect(() => {
    getCareers(pagination.page, pagination.limit);
  }, []);

  // Format date to readable format
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch (error) {
      return dateString;
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      careers.map((career) => ({
        Name: `${career.firstName} ${career.lastName}`,
        Email: career.email,
        Phone: career.phone,
        Designation: career.designation,
        resume: career.resume.s3Url,
        "Date Applied": formatDate(career.createdAt),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Careers");
    XLSX.writeFile(workbook, "Careers.xlsx");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="d-flex align-items-center justify-content-between card-header pb-0 mb-4">
              <h6>Career Applications</h6>
              <button className="btn btn-success" onClick={downloadExcel}>
                Download Excel
              </button>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading applications...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger mx-4">
                    <strong>Error:</strong> {error}
                  </div>
                ) : careers.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg mb-3">
                      <i className="fas fa-inbox opacity-10"></i>
                    </div>
                    <h5>No applications found</h5>
                    <p className="text-secondary">
                      There are no career applications to display at the moment.
                    </p>
                  </div>
                ) : (
                  <>
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Email
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Phone
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Designation
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Date Applied
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {careers.map((career) => (
                          <tr key={career._id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {career.firstName} {career.lastName}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                <a
                                  href={`mailto:${career.email}`}
                                  className="text-primary"
                                >
                                  {career.email}
                                </a>
                              </p>
                            </td>
                            <td>
                              <p className="text-xs text-secondary mb-0">
                                {career.phone}
                              </p>
                            </td>
                            <td>
                              <p className="text-xs text-secondary mb-0">
                                {career.designation}
                              </p>
                            </td>
                            <td>
                              <span className="text-secondary text-xs font-weight-bold">
                                {formatDate(career.createdAt)}
                              </span>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                data-bs-toggle="modal"
                                data-bs-target={`#careerModal-${career._id}`}
                              >
                                <i className="fa fa-eye text-xs"></i> View
                              </button>

                              {/* Modal for viewing full application details */}
                              <div
                                className="modal fade"
                                id={`careerModal-${career._id}`}
                                tabIndex="-1"
                                aria-labelledby={`careerModalLabel-${career._id}`}
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id={`careerModalLabel-${career._id}`}
                                      >
                                        Application Details
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">Name:</h6>
                                        <p>
                                          {career.firstName} {career.lastName}
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">Email:</h6>
                                        <p>
                                          <a
                                            href={`mailto:${career.email}`}
                                            className="text-primary"
                                          >
                                            {career.email}
                                          </a>
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">Phone:</h6>
                                        <p className="text-sm">
                                          {career.phone}
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">
                                          Designation:
                                        </h6>
                                        <p className="text-sm">
                                          {career.designation}
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">
                                          Resume:
                                        </h6>
                                        <p className="text-sm">
                                          {career.resume ? (
                                            <a
                                              href={career?.resume?.s3Url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="btn btn-sm btn-outline-primary"
                                            >
                                              <i className="fas fa-file-pdf me-2"></i>
                                              View Resume
                                            </a>
                                          ) : (
                                            "No resume attached"
                                          )}
                                        </p>
                                      </div>
                                      <div>
                                        <h6 className="text-sm mb-1">
                                          Applied on:
                                        </h6>
                                        <p className="text-xs text-secondary">
                                          {formatDate(career.createdAt)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <a
                                        href={`mailto:${career.email}?subject=RE: Your Job Application&body=Dear ${career.firstName},\n\nThank you for applying for the ${career.designation} position.\n\n`}
                                        className="btn btn-primary"
                                      >
                                        Contact Applicant
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {pagination.totalDocs > 0 && (
                      <div className="px-3 py-3">
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
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCareers;
