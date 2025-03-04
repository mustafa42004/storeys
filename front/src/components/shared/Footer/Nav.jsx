import { NavLink } from "react-router-dom"

const Nav = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <div className="nav">
        <div className="left">
            <p className="font-sm fs-14">© {currentYear} Storeys Real Estate. All rights reserved.</p>
        </div>
        <div className="flex-cs gap-20">
            <NavLink to="/" className="font-sm fs-14">Terms & Conditions</NavLink>
            <NavLink to="/" className="font-sm fs-14">Privacy Policy</NavLink>
            <NavLink to="/" className="font-sm fs-14">Cookie</NavLink>
        </div>
    </div>
    </>
  )
}

export default Nav