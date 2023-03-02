import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './components/pages/HomePage';
import Login from './components/pages/auth/Login'
import CreateAccount from './components/pages/auth/CreateAccount'
import Dashboard from './components/pages/Dashboard'
import UsersMenu from './components/pages/users/UsersMenu';
import AllUsers from './components/pages/users/AllUsers';
import AddUser from './components/pages/users/AddUser';
import EditUser from './components/pages/users/EditUser';
import MoviesMenu from './components/pages/subscriptions_ws/movies/MoviesMenu';
import AddMovie from './components/pages/subscriptions_ws/movies/AddMovie';
import EditMovie from './components/pages/subscriptions_ws/movies/EditMovie';
import AllMovies from './components/pages/subscriptions_ws/movies/AllMovies';
import MembersMenu from './components/pages/subscriptions_ws/members/MembersMenu';
import AddMember from './components/pages/subscriptions_ws/members/AddMember';
import AllMembers from './components/pages/subscriptions_ws/members/AllMembers';
import EditMember from './components/pages/subscriptions_ws/members/EditMember';

const  App = () => {
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div className="App">
        <h1 className='app_title' onClick={()=>navigate('/api/movies')}>{document.title}</h1>
        <Routes>
        {/* public routes */}
          <Route path='/' element={<HomePage />}>
            <Route path='auth/login' element={<Login />}/>
            <Route path='auth/create_account' element={<CreateAccount />}/>
          </Route>
          {/* private registered admin only routes */}
          <Route path='api' element={<Dashboard />}>
              <Route path='users' element={<UsersMenu/>}>
                <Route path='' element={<AllUsers/>} />
                <Route path='adduser' element={<AddUser/>} />
                <Route path=':id' element={<EditUser/>}/>
              </Route>
              <Route path='movies' element={<MoviesMenu/>}>
                <Route path='' element={<AllMovies/>} />
                <Route path='addmovie' element={<AddMovie/>} />
                <Route path=':id' element={<EditMovie/>}/>
              </Route>
              <Route path='members' element={<MembersMenu/>}>
                <Route path='' element={<AllMembers/>} />
                <Route path='addmember' element={<AddMember/>} />
                <Route path=':id' element={<EditMember/>}/>
              </Route>
          </Route>
      </Routes>
    </div>
    </>
  )
}

export default App
