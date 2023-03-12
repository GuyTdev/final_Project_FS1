import { IconButton, Tooltip } from "@mui/material"
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import {useDispatch, useSelector} from 'react-redux'
import { useGetUserQuery } from "../../rtk/features/users/usersApiSlice";
import { calculateLogoutTime, setMongoDbFetchedUser, setUserNavbarPages, setUserRoleAsAdmin } from "../../rtk/features/users/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoggedInUser = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { data: userDetails, isLoading,isSuccess, isError, error } = useGetUserQuery(id);
    const autoLogoutTime = useSelector(state => state.user.autoLogoutTime);
    useEffect(() => {
      if(isSuccess &&userDetails.sessionTimeout)
        setUserStoreFetchedDetails()
    }, [isSuccess, userDetails])

    const setUserStoreFetchedDetails = ()=>{
      dispatch(setMongoDbFetchedUser(userDetails))//store all current loggedIn user details in redux store
      dispatch(calculateLogoutTime(userDetails?.sessionTimeout))//calculate logout time
      //set time for auto logout
      handleLogoutTimer(userDetails?.sessionTimeout);//logout after sessionsTimeout Minutes
      console.log("userDetails?.username",userDetails?.username);
      if(userDetails?.username.includes("admin")) {
        dispatch(setUserRoleAsAdmin())
      }
      dispatch(setUserNavbarPages())
    }
    // this function sets the timer that logs out the user after 10 secs
let timer;
const handleLogoutTimer = (sessionTimeout) => {
  timer = setTimeout(() => {
    // clears any pending timer.
    resetTimer();
    // Listener clean up. Removes the existing event listener from the window
    // logs out user
    navigate('/auth/logout');
  }, sessionTimeout * 60 * 1000); // sessionTimeout in minutes * 60(to sec)*1000(to ms).
};

// this resets the timer if it exists.
const resetTimer = () => {
  if (timer) clearTimeout(timer);
};
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
                          You will be logged out automatically at :${autoLogoutTime ? autoLogoutTime: 'not calculated yet'}`} >
      <IconButton>
        <AccessTimeFilledIcon />
      </IconButton>
      </Tooltip>
    </>
    }
    </>
  )
}

export default LoggedInUser