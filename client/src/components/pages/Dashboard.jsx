import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from '../layout/Navbar'
import LoggedInUser from "./LoggedInUser";
 const  Dashboard = () => {
  let navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({id:"",username:""})
    const pages = useSelector(state=>state.user.pages)
    let authToken = sessionStorage.getItem('Auth Token')
    useEffect(() => {
      const username = sessionStorage.getItem('username');
      let userId = sessionStorage.getItem('userId')
        setLoggedInUser(username)
        if (authToken) {
            setLoggedInUser({id:userId, username:username})
            // navigate('/api')
        }
        if (!authToken) {
            alert("Please Login First");
            navigate('/auth/login')
        }
    }, [pages])
  return (
    <div>
      {authToken?
      <>
        <Navbar pages={pages}/>
        <h3>loggedIn as {loggedInUser?.username?.split('@')[0]}</h3>
        <LoggedInUser id={loggedInUser.id}/>
        <Outlet/>
      </>
      :null}
    </div>
  );
}
export default Dashboard;