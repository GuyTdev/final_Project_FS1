import { IconButton, Tooltip } from "@mui/material"
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {useDispatch} from 'react-redux'
import { useGetUserQuery } from "../../rtk/features/users/usersApiSlice";
import { setMongoDbFetchedUser, setUserNavbarPages, setUserRoleAsAdmin } from "../../rtk/features/users/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const LoggedInUser = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { data: userDetails, isLoading,isSuccess, isError, error } = useGetUserQuery(id);
    const [counter, setCounter] = useState(null);
    useEffect(() => {
      if(isSuccess && userDetails.sessionTimeout){
        setUserStoreFetchedDetails()
      }
      if(sessionStorage.getItem("autoLogoutTime") !== '')
        setCounter(moment(sessionStorage.getItem("autoLogoutTime")).diff(Date.now(), 's'))
    }, [isSuccess, userDetails])
      // Handle logout
    useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if(moment(Date.now()).isSameOrAfter(moment(sessionStorage.getItem("autoLogoutTime"))))
          navigate('/auth/logout')
      return () => clearInterval(timer);
    }, [counter]);

    const setUserStoreFetchedDetails = ()=>{
      dispatch(setMongoDbFetchedUser(userDetails))//store all current loggedIn user details in redux store
      //set time for auto logout
      if(sessionStorage.getItem("firstTimeFlag") === 'true'){
        calculateLogoutTime(userDetails?.sessionTimeout)//calculate logout time and store to sessionStorage
        setCounter(userDetails?.sessionTimeout*60);//logout after sessionsTimeout Minutes
        sessionStorage.setItem('firstTimeFlag', false)
      }
      if(userDetails?.username.includes("admin")) {
        dispatch(setUserRoleAsAdmin())
      }
      dispatch(setUserNavbarPages())
    }
    const calculateLogoutTime = (sessionsTimeoutInMinutes) => {
      let timezoneOffset = new Date().getTimezoneOffset() * 60000;
      let calculatedTime = new Date(Date.now() - timezoneOffset + sessionsTimeoutInMinutes * 60000);
      // let calculatedTime = moment(Date.now() + action.payload * 60000);
      sessionStorage.setItem('autoLogoutTime', calculatedTime.toISOString().slice(0,-1))
    }
    const handlePressHourglassButton = () => {
      if(sessionStorage.getItem("autoLogoutTime") !== '')
        setCounter(moment(sessionStorage.getItem("autoLogoutTime")).diff(Date.now(), 's'))
    }




  return (
    <>
    {isLoading?<div>Loading...</div>:isError?<div>Error: {error.message}</div>:
    <>
       <Tooltip title={!userDetails? "Permissions": `Permissions: ${userDetails?.permissions?.toString().replaceAll(',',` | `)}`} >
      <IconButton>
        <FactCheckIcon />
      </IconButton>
      </Tooltip>
       <Tooltip title={!userDetails? "Session Timeout (Minutes)": 
                        `Session Timeout: ${userDetails?.sessionTimeout} Minutes,
                          You will be logged out automatically at :${sessionStorage.getItem("autoLogoutTime") ? moment(sessionStorage.getItem("autoLogoutTime")).format('DD MMM YYYY HH:mm:ss'): 'not calculated yet'}`} >
      <IconButton>
        <AccessTimeFilledIcon />
      </IconButton>
      </Tooltip>
       <Tooltip title={counter? `${Math.floor(counter/60)} Minutes and ${counter %60} Seconds left to auto logout`
                              :sessionStorage.getItem("autoLogoutTime")?
                              `You will be logged out ${moment(sessionStorage.getItem("autoLogoutTime")).fromNow()}`
                              :null} >
      <IconButton onClick={handlePressHourglassButton}>
        <HourglassTopIcon />
      </IconButton>
      </Tooltip>
    </>
    }
    </>
  )
}

export default LoggedInUser