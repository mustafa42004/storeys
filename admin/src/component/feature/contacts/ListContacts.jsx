import { useState, useEffect } from "react";
import { fetch as fetchContacts } from "../../../services/ContactService";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Pagination from "../../shared/Pagination/Pagination";

const ListContacts = () => {
  const [contacts, setContacts] = useState([]);
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

  const getContacts = async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchContacts(page, limit);

      if (response.success || response.status === "success") {
        setContacts(response?.data?.docs || []);

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
        setError(response.message || "Failed to fetch contacts");
        toast.error(response.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("An unexpected error occurred while fetching contacts");
      toast.error("An unexpected error occurred while fetching contacts");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    getContacts(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit) => {
    getContacts(1, newLimit);
  };

  useEffect(() => {
    getContacts(pagination.page, pagination.limit);
  }, []);

  // Format date to readable format
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch (error) {
      return dateString;
    }
  };

  // Truncate long messages for display in table
  const truncateMessage = (message, maxLength = 50) => {
    if (!message) return "";
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <h6>Contact Inquiries</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading contacts...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger mx-4">
                    <strong>Error:</strong> {error}
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg mb-3">
                      <i className="fas fa-inbox opacity-10"></i>
                    </div>
                    <h5>No contacts found</h5>
                    <p className="text-secondary">
                      There are no contact inquiries to display at the moment.
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
                            Message
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Date
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr key={contact._id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {contact.firstName} {contact.lastName}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="text-primary"
                                >
                                  {contact.email}
                                </a>
                              </p>
                            </td>
                            <td>
                              <p className="text-xs text-secondary mb-0">
                                {truncateMessage(contact.message)}
                              </p>
                            </td>
                            <td>
                              <span className="text-secondary text-xs font-weight-bold">
                                {formatDate(contact.createdAt)}
                              </span>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                data-bs-toggle="modal"
                                data-bs-target={`#contactModal-${contact._id}`}
                              >
                                <i className="fa fa-eye text-xs"></i> View
                              </button>

                              {/* Modal for viewing full contact details */}
                              <div
                                className="modal fade"
                                id={`contactModal-${contact._id}`}
                                tabIndex="-1"
                                aria-labelledby={`contactModalLabel-${contact._id}`}
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id={`contactModalLabel-${contact._id}`}
                                      >
                                        Contact Details
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
                                          {contact.firstName} {contact.lastName}
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">Email:</h6>
                                        <p>
                                          <a
                                            href={`mailto:${contact.email}`}
                                            className="text-primary"
                                          >
                                            {contact.email}
                                          </a>
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <h6 className="text-sm mb-1">
                                          Message:
                                        </h6>
                                        <p className="text-sm">
                                          {contact.message}
                                        </p>
                                      </div>
                                      <div>
                                        <h6 className="text-sm mb-1">
                                          Received on:
                                        </h6>
                                        <p className="text-xs text-secondary">
                                          {formatDate(contact.createdAt)}
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
                                      {/* <a
                                        href={`mailto:${contact.email}?subject=RE: Your Inquiry&body=Dear ${contact.firstName},\n\nThank you for contacting us.\n\n`}
                                        className="btn btn-primary"
                                      >
                                        Reply via Email
                                      </a> */}
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

export default ListContacts;
