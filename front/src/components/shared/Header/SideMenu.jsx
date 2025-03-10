import { NavLink } from "react-router-dom";
import { headerLinks } from "../../../utils/static/headerData";

const SideMenu = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <section id="side-menu" className="side-menu">
      <div className="layout">
        {headerLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.link}
            className="item font-sm medium"
            onClick={handleLinkClick}
          >
            {link.name}
          </NavLink>
        ))}
        <NavLink to="/contact" className="cs-btn" onClick={handleLinkClick}>
          Contact Us <i className="fa-regular fa-arrow-right"></i>
        </NavLink>
      </div>
    </section>
  );
};

export default SideMenu;
