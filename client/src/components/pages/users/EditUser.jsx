import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../../../rtk/features/users/usersApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data: user, isLoading:isLoadingUser, isFetching, isError:isErrorGetUser} = useGetUserQuery(id);
  const [updateUser, { isError, error }] = useUpdateUserMutation();
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    sessionTimeout: "",
    permissions: [],
  });
  useEffect(() => {
    if(user){
      setUpdatedUser(user);
    }
  }, [user])
  useEffect(() => {
    addObviousPermissions();
  }, [updatedUser.permissions])
 const addObviousPermissions =()=>{
    let needle1= ["Create Subscriptions", "Update Subscriptions", "Delete Subscriptions"]
    if(needle1.some(i=>updatedUser.permissions?.includes(i)) && !updatedUser.permissions.includes("View Subscriptions")){
      setUpdatedUser({
        ...updatedUser,
        permissions: [...updatedUser.permissions, "View Subscriptions"]
      });
    }
    let needle2= ["Create Movies", "Update Movies", "Delete Movies"]
    if(needle2.some(i=>updatedUser.permissions?.includes(i)) && !updatedUser.permissions.includes("View Movies")){
      setUpdatedUser({
        ...updatedUser,
        permissions: [...updatedUser.permissions, "View Movies"]
      });
    }
  }
  const handlePermissionChange = (e) => {
    const index = updatedUser.permissions.indexOf(e.target.value);
    if (index === -1) {
      setUpdatedUser({ ...updatedUser, permissions: [...updatedUser.permissions, e.target.value] });
    } else {
      setUpdatedUser({
        ...updatedUser,
        permissions: [
          ...updatedUser.permissions.filter(
            (permission) => permission !== e.target.value
          ),
        ],
      });
    }
  };
  const handleUpdate = (e) => {
    console.log(updatedUser);
    if (updatedUser) {
      updateUser(updatedUser);
    }
    if(!isError){
      navigate('');
    }
  };
  const handleCancel = (e) => {
    console.log("canceled");
    navigate('');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };
  let areUserDetailsFieldsFilled = user?.firstName !== "" &&  user?.lastName !== "" &&  user?.username !== "" && user?.sessionTimeout !== "";


  let areUserPermissionsFieldsFilled = user?.permissions?.length > 0

  let areAllFieldsFilled = areUserDetailsFieldsFilled && areUserPermissionsFieldsFilled

  return (
    <div>
      {
        isErrorGetUser? <p>Error: {error.message}</p>:
      isLoadingUser? <p>Loading...</p>:
      isFetching? <p>Fetching...</p>:
      <>
      <h3>Edit User: {`${user?.firstName} ${user?.lastName}`}</h3>
      <Box
      sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControl>
        <FormLabel sx={{color: areUserDetailsFieldsFilled?'green':'red'}}>User Details</FormLabel>
            <TextField
              sx={{ margin: 2 }}
              required
              id="outlined-required"
              label="First Name"
              placeholder="John"
              name="firstName"
              onChange={handleChange}
              defaultValue={user?.firstName}
            />
            <TextField
              sx={{ margin: 2 }}
              required
              id="outlined-required"
              label="Last Name"
              placeholder="Doe"
              name="lastName"
              onChange={handleChange}
              defaultValue={user?.lastName}
            />
            <TextField
              sx={{ margin: 2 }}
              margin-bottom="10px"
              required
              id="outlined-required"
              label="Username"
              name="username"
              placeholder="j.doe@gmail.com"
              onChange={handleChange}
              defaultValue={user?.username}
            />
            <TextField
              sx={{ margin: 2 }}
              required
              type="number"
              id="outlined-required"
              label="Session Timeout (Minutes)"
              name="sessionTimeout"
              placeholder="60"
              onChange={handleChange}
              defaultValue={user?.sessionTimeout}

              />
        </FormControl>

          <FormControl >
            <FormLabel sx={{color: areUserPermissionsFieldsFilled?'green':'red'}}>Permissions</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="View Subscriptions"
                    checked={updatedUser?.permissions?.includes("View Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                
                label={<Typography variant="h6" >View Subscriptions</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Create Subscriptions"
                    checked={updatedUser?.permissions?.includes("Create Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Create Subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Update Subscriptions"
                    checked={updatedUser?.permissions?.includes("Update Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Update Subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Delete Subscriptions"
                    checked={updatedUser?.permissions?.includes("Delete Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Delete Subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="View Movies"
                    checked={updatedUser?.permissions?.includes("View Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label={<Typography variant="h6" >View Movies</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Create Movies"
                    checked={updatedUser?.permissions?.includes("Create Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Create Movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Update Movies"
                    checked={updatedUser?.permissions?.includes("Update Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Update Movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Delete Movies"
                    checked={updatedUser?.permissions?.includes("Delete Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Delete Movies"
              />
            </FormGroup>
          </FormControl>
      </Box>
            <Stack sx={{
              display: "flex",
              justifyContent: "center",
              margin: 2,
            }} direction="row" spacing={2}>
              <Button
                onClick={handleUpdate}
                disabled={!areAllFieldsFilled}
                variant="contained"
                startIcon={<UpdateIcon />}
              >
                Update
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                endIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Stack>
      </>
  }
    </div>

  );
};

export default EditUser;
