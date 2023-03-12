import { Outlet, useNavigate } from "react-router-dom"
import AppBar from '../layout/AppBar'


const HomePage = () => {
  const navigate = useNavigate()
  const handleTitleClick =()=>{
    let authToken = sessionStorage.getItem('Auth Token')
    if(authToken){
      navigate('api/movies')
    }else{
      navigate('/auth/login')
    }
  }
  return (
    <div>
    <AppBar/>
        <h1 className='app_title' onClick={handleTitleClick}>{document.title}</h1>
      <h1>HomePage</h1>
      <p>Welcome to MSM - Movies and Subscriptions Management Website  </p>
      <p>
        This web application is consist of MERN stack framework.
      </p>

        <Outlet/>
      </div>
  )
}

export default HomePage