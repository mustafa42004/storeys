import Logo from "../../static_components/images/Logo"
import { NavLink } from "react-router-dom"
import { headerLinks } from "../../../utils/static/headerData"
import React, { useEffect, useRef, useState } from "react"
import SideMenu from "./SideMenu"

const Header = ({ height }) => {
    const headerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (window.innerWidth <= 767) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [])

    useEffect(() => {
        if (headerRef.current && typeof height === 'function') {
            height(headerRef.current.offsetHeight)
        }
    }, [height, headerRef])

    
    useEffect(() => {
        if (toggle) {
            document.getElementById('hamburger')?.classList.add('active')
            document.getElementById('side-menu').style.transform = 'translateX(0%)'
        } else {
            document.getElementById('hamburger')?.classList.remove('active')
            document.getElementById('side-menu').style.transform = 'translateX(100%)'
        }
    }, [toggle])

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
                            {
                                !isMobile ? (
                                    <>
                                        {headerLinks.map((link, index) => (
                                            <NavLink key={index} to={link.link} className="item font-sm medium">{link.name}</NavLink>
                                        ))}
                                        <NavLink to="/contact" className="cs-btn">Contact Us <i className="fa-regular fa-arrow-right"></i></NavLink>
                                    </>
                                ) : (
                                    <div onClick={()=>setToggle(!toggle)} id="hamburger" className="hamburger">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                )
                            }

                            <SideMenu />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header





