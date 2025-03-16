import Home from "../../component/feature/Home/Home";
import CreateProperty from "../../component/feature/Properties/Create/CreateProperty";
import Property from "../../component/feature/Properties/View/Property";
import Logout from "../../component/shared/Auth/Logout";
import Teams from "../../component/feature/Teams/Create/Teams";
import News from "../../component/feature/News/View/News";
import CreateNews from "../../component/feature/News/Create/CreateNews";
import TeamList from "../../component/feature/Teams/View/TeamList";
import Amenity from "../../component/feature/amenities/View/Amenity";
import CreateAmenity from "../../component/feature/amenities/Create/CreateAmenity";
import TestimonialList from "../../component/feature/Testimonials/View/TestimonialList";
import CreateTestimonial from "../../component/feature/Testimonials/Create/CreateTestimonial";
import { Navigate } from "react-router-dom";
const rootRoutes = [
  {
    path: "/",
    element: <Navigate to="/property" replace />,
  },
  {
    path: "property",
    index: true,
    element: <Property />,
  },
  {
    path: "create-property",
    element: <CreateProperty />,
  },
  {
    path: "edit-property/:id",
    element: <CreateProperty />,
  },
  {
    path: "teams",
    element: <TeamList />,
  },
  {
    path: "create-teams",
    element: <Teams />,
  },
  {
    path: "edit-teams/:id",
    element: <Teams />,
  },
  {
    path: "testimonials",
    element: <TestimonialList />,
  },
  {
    path: "create-testimonial",
    element: <CreateTestimonial />,
  },
  {
    path: "edit-testimonial/:id",
    element: <CreateTestimonial />,
  },
  {
    path: "news",
    element: <News />,
  },
  {
    path: "create-news",
    element: <CreateNews />,
  },
  {
    path: "edit-news/:id",
    element: <CreateNews />,
  },
  {
    path: "amenity",
    element: <Amenity />,
  },
  {
    path: "create-amenity",
    element: <CreateAmenity />,
  },
  {
    path: "edit-amenity/:id",
    element: <CreateAmenity />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
];

export default rootRoutes;
