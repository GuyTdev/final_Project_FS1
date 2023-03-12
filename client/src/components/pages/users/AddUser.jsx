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
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useCreateUserMutation } from "../../../rtk/features/users/usersApiSlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [createUser, { isSuccess, isError, error }] =
    useCreateUserMutation();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    sessionTimeout: "",
    permissions: [],
  });
  useEffect(() => {
    addObviousPermissions();
  }, [user.permissions])
  useEffect(() => {
    if(isError){
      console.log(error);
    }
    if(isSuccess){
      console.log(`successfully create user ${user.username}`);
      navigate("");
    }
  }, [isSuccess,isError])
  const handlePermissionChange = (e) => {
    const index = user.permissions.indexOf(e.target.value);
    if (index === -1) {
      setUser({ ...user, permissions: [...user.permissions, e.target.value] });
    } else {
      setUser({
        ...user,
        permissions: [
          ...user.permissions.filter(
            (permission) => permission !== e.target.value
          ),
        ],
      });
    }
  };
  const addObviousPermissions =()=>{
    let needle1= ["Create Subscriptions", "Update Subscriptions", "Delete Subscriptions"]
    if(needle1.some(i=>user.permissions?.includes(i)) && !user.permissions.includes("View Subscriptions")){
      setUser({
        ...user,
        permissions: [...user.permissions, "View Subscriptions"]
      });
    }
    let needle2= ["Create Movies", "Update Movies", "Delete Movies"]
    if(needle2.some(i=>user.permissions?.includes(i)) && !user.permissions.includes("View Movies")){
      setUser({
        ...user,
        permissions: [...user.permissions, "View Movies"]
      });
    }
  }
  const handleSave = async (e) => {
    console.log(user);
    if (user) {
      await createUser(user);
    }
  };
  const handleCancel = (e) => {
    console.log("canceled");
    navigate('')
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  let areUserDetailsFieldsFilled = user.firstName !== "" &&  user.lastName !== "" &&  user.username !== "" && user.sessionTimeout !== "";


  let areUserPermissionsFieldsFilled = user.permissions?.length > 0

  let areAllFieldsFilled = areUserDetailsFieldsFilled && areUserPermissionsFieldsFilled

  return (
    <div className="form_box">
      <h3>Add User</h3>
      <Box
        sx={{
          display: "flex-center",
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
              defaultValue=""
            />
            <TextField
              sx={{ margin: 2 }}
              required
              id="outlined-required"
              label="Last Name"
              placeholder="Doe"
              name="lastName"
              onChange={handleChange}
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
            />
        </FormControl>

          <FormControl >
            <FormLabel sx={{color: areUserPermissionsFieldsFilled?'green':'red'}}>Permissions</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="View Subscriptions"
                    checked={user.permissions?.includes("View Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label={<Typography variant="h6" >View Subscriptions</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Create Subscriptions"
                    checked={user.permissions?.includes("Create Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Create Subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Update Subscriptions"
                    checked={user.permissions?.includes("Update Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Update Subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Delete Subscriptions"
                    checked={user.permissions?.includes("Delete Subscriptions")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Delete Subscriptions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="View Movies"
                    checked={user.permissions?.includes("View Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label={<Typography variant="h6" >View Movies</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Create Movies"
                    checked={user.permissions?.includes("Create Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Create Movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Update Movies"
                    checked={user.permissions?.includes("Update Movies")}
                    onChange={handlePermissionChange}
                  />
                }
                label="Update Movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Delete Movies"
                    checked={user.permissions?.includes("Delete Movies")}
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
                onClick={handleSave}
                disabled={!areAllFieldsFilled}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                endIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Stack>
    </div>
  );
};

export default AddUser;
