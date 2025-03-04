import Landing from "../../components/feature/Landing/Landing";
import AboutUs from "../../components/feature/AboutUs/AboutUs";
import PropertyList from "../../components/feature/Property/PropertyList";
import Team from "../../components/feature/OurTeam/Team";
import ContactUs from "../../components/feature/ContactUs/ContactUs";
import Complaint from "../../components/feature/Complaint/Complaint";
import PropertyInner from "../../components/feature/Property/PropertyInner/PropertyInner";
import Communities from "../../components/feature/Communities/Communities";
import Careers from "../../components/feature/Careers/Careers";
import News from "../../components/feature/News/News";
import OurServices from "../../components/feature/OurServices/OurServices";
import ServiceInner from "../../components/feature/OurServices/ServiceInner";

const rootRoutes = [
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/about",
        element: <AboutUs />
    },
    {
        path: "/property",
        element: <PropertyList />
    },
    {
        path: "/team",
        element: <Team />
    },
    {
        path: "/contact",
        element: <ContactUs />
    }, 
    {
        path: "/complaint",
        element: <Complaint />
    },
    {
        path: "/property/:id",
        element: <PropertyInner />
    },
    {
        path: "/communities",
        element: <Communities />
    },
    {
        path: "/careers",
        element: <Careers />
    },
    {
        path: "/news",
        element: <News />
    },
    {
        path: "/services",
        element: <OurServices />
    },
    {
        path: "/services/:id",
        element: <ServiceInner />
    }
]

export default rootRoutes;
