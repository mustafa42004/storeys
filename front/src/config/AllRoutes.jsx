import { Navigate, useRoutes } from "react-router-dom";
import RootModule from "../modules/RootModule";
import rootRoutes from "./Root/Root";
const AllRoutes = () => {
    

    const routes = useRoutes([
        {
            path: "/",
            element: <RootModule />,
            children: rootRoutes
        },
        {
            path: "*",
            element: <Navigate to="/" replace />, // Catch-all for undefined routes
        },

    ]);

    return routes;
};

export default AllRoutes;
