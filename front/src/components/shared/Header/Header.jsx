import Logo from "../../static_components/images/Logo";
import { NavLink } from "react-router-dom";
import { headerLinks } from "../../../utils/static/headerData";
import React, { useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";

const Header = ({ height }) => {
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (headerRef.current && typeof height === "function") {
      height(headerRef.current.offsetHeight);
    }
  }, [height, headerRef]);

  useEffect(() => {
    const sideMenu = document.getElementById("side-menu");
    const hamburger = document.getElementById("hamburger");

    if (toggle) {
      hamburger?.classList.add("active");
      if (sideMenu) {
        sideMenu.style.transform = "translateX(0%)";
        document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      }
    } else {
      hamburger?.classList.remove("active");
      if (sideMenu) {
        sideMenu.style.transform = "translateX(100%)";
        document.body.style.overflow = ""; // Restore scrolling
      }
    }
  }, [toggle]);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="layout">
              <div className="logo">
                <Logo width={isMobile ? 70 : 100} height="100" />
              </div>
              <div className="nav-items">
                {!isMobile ? (
                  <>
                    {headerLinks.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.link}
                        className="item font-sm medium"
                      >
                        {link.name}
                      </NavLink>
                    ))}
                    <NavLink to="/contact" className="cs-btn">
                      Contact Us <i className="fa-regular fa-arrow-right"></i>
                    </NavLink>
                  </>
                ) : (
                  <div
                    onClick={() => setToggle(!toggle)}
                    id="hamburger"
                    className="hamburger"
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideMenu isOpen={toggle} onClose={() => setToggle(false)} />
    </header>
  );
};

export default Header;
