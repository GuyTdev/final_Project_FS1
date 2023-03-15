import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserRoleAsSimpleManager } from "../../../rtk/features/users/userSlice";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
      sessionStorage.setItem('userId', "")
      sessionStorage.setItem('Auth Token', "")
      sessionStorage.setItem('username', "")
      sessionStorage.setItem('autoLogoutTime', "")
      dispatch(setUserRoleAsSimpleManager())
        navigate("/auth/login");
    }
    useEffect(() => {
        handleLogout()

   }, [])

   return (
    <div>Logging out...</div>
  )
}

export default Logout