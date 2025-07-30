// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import { useSelector } from "react-redux"

const NavbarUser = () => {
  const user = useSelector(state=> state.auth.user)
  
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <UserDropdown user={user}/>
    </ul>
  )
}
export default NavbarUser
