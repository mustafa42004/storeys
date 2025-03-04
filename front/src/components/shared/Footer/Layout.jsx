import { NavLink } from "react-router-dom"
import Logo from "../../static_components/images/Logo"
import { footerLinks } from "../../../utils/static/footerData"

const Layout = () => {
  return (
    <>
        <div className="layout">
            <div className="footer-content">
                <div className="footer-logo mb-5">
                    <Logo />
                </div>
                <div className="footer-buttons">
                    <button className="cs-btn p-16-65">Book a  Valuation <i className="fa-regular fa-arrow-right"></i></button>
                    <button className="cs-btn outline">Explore More <i className="fa-regular fa-arrow-right"></i></button>
                </div>
                <p className="font-sm text-left fs-16">Storeys is a top real estate brokerage in Dubai, excelling in Sales, Leasing, and Off-Plan properties. With 20+ years of expertise, we offer innovative strategies, helping investors maximize their real estate potential in a dynamic market.</p>
            </div>
            {
                footerLinks.map((item, index) => {
                    if (item.title !== "Get in Touch") {
                        return (
                            <div className="footer-links pl-50" key={index}>
                                <h4 className="font-lg font-sans bold fs-18">{item.title}</h4>
                                <ul className="footer-links-list">
                                    {item.links.map((link, index) => (
                                        <li key={index}><NavLink className="font-sm fs-16" to={link.link}>{link.name}</NavLink></li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                    return null;
                })
            }
            <div className="footer-links pl-50">
                <h4 className="font-lg font-sans bold fs-18">Get in Touch</h4>
                <ul className="footer-links-list">
                    {footerLinks.find(item => item.title === "Get in Touch").links.map((link, index) => (
                        <li className="font-sm fs-16" key={index}>{link.name}</li>
                    ))}
                </ul>
                <div className="buttons">
                    {footerLinks.find(item => item.title === "Get in Touch").buttons.map((button, index) => (
                        <NavLink to={button.link} className="social-btn" key={index}>
                            <img src={button.icon} alt={button.name} />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout