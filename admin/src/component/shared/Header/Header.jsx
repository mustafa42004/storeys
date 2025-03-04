import { NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  return (
    <>
        <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            navbar-scroll="true"
        >
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li className="breadcrumb-item text-sm">
                    <a className="opacity-5 text-dark" href="javascript:;">
                        Pages
                    </a>
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
                <div
                className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                id="navbar"
                >
                <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center">
                    <NavLink to='/logout'
                        href="javascript:;"
                        className="nav-link text-body font-weight-bold px-0"
                    >
                        <i className="fa fa-user me-sm-1" />
                        <span className="d-sm-inline d-none">LogOut</span>
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
  )
}

export default Header