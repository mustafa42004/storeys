import { NavLink } from "react-router-dom"
import { headerLinks } from "../../../utils/static/headerData"

const SideMenu = () => {
  return (
    <>
        <section id="side-menu" className="side-menu">
        <div className="layout">
                {headerLinks.map((link, index) => (
                    <NavLink key={index} to={link.link} className="item font-sm medium">{link.name}</NavLink>
                ))}
                <NavLink to="/contact" className="item font-sm medium">Contact Us</NavLink>
            </div>
        </section>
    </>
  )
}

export default SideMenu