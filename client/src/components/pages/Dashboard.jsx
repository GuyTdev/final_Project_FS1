import { Outlet } from "react-router-dom";

 const  Dashboard = () => {
  return (
    <div>
      <h3>Dashboard for loggedIn users</h3>
      <Outlet/>
    </div>
  );
}
export default Dashboard;