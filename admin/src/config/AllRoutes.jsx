import { Navigate, useRoutes } from "react-router-dom";
import rootRoutes from "./root/Root";
import RootModule from "../modules/RootModule";
import Signin from "../component/shared/Auth/Signin";

const AllRoutes = () => {
  const isTokenPresent = !!localStorage.getItem("ddlj"); 

    const routes = [
        // Authenticated routes
        {
            path: "/",
            element: isTokenPresent ? <RootModule /> : <Navigate to="/signin" replace />,
            children: rootRoutes, 
        },
        // Unauthenticated routes
        {
            path: "/signin",
            element: isTokenPresent ? <Navigate to="/" replace /> : <Signin />,
        },
        // Catch-all for undefined routes
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ];

    return useRoutes(routes);
    };

export default AllRoutes;
