import { NavLink } from "react-router-dom"

const Nav = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <div className="nav">
        <div className="left">
            <p className="font-sm fs-14">© {currentYear} Storeys Real Estate. All rights reserved.</p>
            <p className="font-sm fs-14 created-line">Designed and developed by <a href="https://aerozefcreations.com/" target="_blank">Aerozef Creations</a></p>
        </div>
        <div className="flex-cs gap-20">
            <NavLink to="/terms-and-conditions" className="font-sm fs-14">Terms & Conditions</NavLink>
            <NavLink to="/privacy-policy" className="font-sm fs-14">Privacy Policy</NavLink>
        </div>
    </div>
    </>
  )
}

export default Nav