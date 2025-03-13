import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ toggleSidebar }) => {
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
                className="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Tables
              </li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Tables</h6>
          </nav>

          <div className="ms-auto d-flex align-items-center">
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  to="/logout"
                  className="nav-link text-body font-weight-bold px-0"
                >
                  <i className="fa fa-user me-sm-1" />
                  <span className="d-none d-sm-inline">LogOut</span>
                </NavLink>
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
