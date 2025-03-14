import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../component/shared/Sidebar/Sidebar";
import Header from "../component/shared/Header/Header";
import { fetch as fetchTeams } from "../services/TeamService";
import { fetch as fetchProperties } from "../services/PropertyService";
import { useDispatch } from "react-redux";
import { handleGetTeam } from "../redux/TeamDataSlice";
import { handleGetProperty } from "../redux/PropertyDataSlice";

const RootModule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ddlj")) {
      navigate("/signin");
    }
  }, []);

  const getTeams = async () => {
    const response = await fetchTeams();
    if (response.success) {
      dispatch(handleGetTeam(response?.result));
    }
  };

  const getProperties = async () => {
    const response = await fetchProperties();
    if (response.success) {
      dispatch(handleGetProperty(response?.result));
    }
  };

  useEffect(() => {
    getTeams();
    getProperties();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidenav-main");
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target)) {
        // Check if we're on mobile
        if (window.innerWidth < 992) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Add body class to control overall layout
  useEffect(() => {
    document.body.classList.toggle("g-sidenav-pinned", isSidebarOpen);
    document.body.classList.add("g-sidenav-show");
  }, [isSidebarOpen]);

  return (
    <div className="main-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="container-fluid px-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootModule;
