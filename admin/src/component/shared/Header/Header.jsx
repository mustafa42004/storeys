import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar navbar-main navbar-expand-lg shadow-none w-100"
        id="navbarBlur"
        data-bs-scroll="true"
      >
        <div className="container-fluid py-1">
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>

          <nav aria-label="breadcrumb" className="d-none d-lg-block">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm">
                <a className="opacity-5 text-dark">Pages</a>
              </li>
              <li
                className="breadcrumb-item text-sm text-dark active text-capitalize "
                aria-current="page"
              >
                {window.location.pathname.substring(1)}
              </li>
            </ol>
          </nav>

          <div className="ms-auto d-flex align-items-center">
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-flex align-items-center">
                <div
                  className="nav-link text-body font-weight-bold px-0 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  <i className="fa fa-user me-sm-1" />
                  <span className="d-none d-sm-inline">LogOut</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Header;
