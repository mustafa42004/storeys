import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetch as fetchNews,
  deleteProperty as deleteNews,
} from "../../../../services/NewsService";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Spinner from "../../../shared/Spinner/Spinner";
import Pagination from "../../../shared/Pagination/Pagination";

const News = () => {
  const [news, setNews] = useState([]);
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

  const getNews = async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchNews(page, limit);

      if (response.success || response.status === "success") {
        setNews(response?.data?.docs || []);

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
        setError(response.message || "Failed to fetch news");
        toast.error(response.message || "Failed to fetch news");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("An unexpected error occurred while fetching news");
      toast.error("An unexpected error occurred while fetching news");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    getNews(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit) => {
    getNews(1, newLimit);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    setIsDeleting(true);
    setDeleteId(id);

    try {
      const response = await deleteNews(id);

      if (response.success || response.status == "204") {
        toast.success("News deleted successfully");
        getNews(pagination.page, pagination.limit);
      } else {
        toast.error(response.message || "Failed to delete news");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("An unexpected error occurred while deleting news");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    getNews(pagination.page, pagination.limit);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="com-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <div className="flex-cs header">
                  <h5>News table</h5>
                  <NavLink to="/create-news" className="btn bg-gradient-info">
                    <i className="fa-solid fa-plus" /> &nbsp; Add News
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive p-0">
                  {isLoading ? (
                    <div className="text-center py-5">
                      <Spinner />
                      <p className="mt-3">Loading news data...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-5 text-danger">
                      <i className="fa-solid fa-circle-exclamation fa-2xl mb-3"></i>
                      <p>{error}</p>
                      <button
                        className="btn btn-sm btn-outline-primary mt-3"
                        onClick={() =>
                          getNews(pagination.page, pagination.limit)
                        }
                      >
                        Try Again
                      </button>
                    </div>
                  ) : news.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                      <i className="fa-solid fa-newspaper fa-2xl mb-3"></i>
                      <p>No news articles found</p>
                      <NavLink
                        to="/create-news"
                        className="btn btn-sm btn-primary mt-3"
                      >
                        Create Your First News Article
                      </NavLink>
                    </div>
                  ) : (
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Image
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Title
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
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
                        {news.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  {item.banner?.s3Url ? (
                                    <img
                                      src={item.banner.s3Url}
                                      className="avatar avatar-sm me-3"
                                      alt={item.title}
                                    />
                                  ) : (
                                    <div className="avatar avatar-sm me-3 bg-gradient-secondary">
                                      <i className="fa-solid fa-newspaper text-white"></i>
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{item.title}</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.permalink}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {item.title}
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                {item.content?.substring(0, 50)}...
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span
                                className={`badge badge-sm ${
                                  item.status === "published"
                                    ? "bg-gradient-success"
                                    : item.status === "draft"
                                    ? "bg-gradient-secondary"
                                    : "bg-gradient-warning"
                                }`}
                              >
                                {item.status}
                              </span>
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
                                to={`/edit-news/${item._id}`}
                                className="text-primary font-weight-bold text-xs me-3"
                                data-toggle="tooltip"
                                data-original-title="Edit news"
                              >
                                <i className="fa-solid fa-pen-to-square me-1"></i>
                                Edit
                              </NavLink>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-danger font-weight-bold text-xs border-0 bg-transparent"
                                disabled={isDeleting && deleteId === item._id}
                                data-toggle="tooltip"
                                data-original-title="Delete news"
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

export default News;
