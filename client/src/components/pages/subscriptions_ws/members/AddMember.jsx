import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useCreateMemberMutation } from "../../../../rtk/features/members/membersApiSlice";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const navigate = useNavigate();

  const [createMember, { isSuccess, isError, error }] = useCreateMemberMutation();
  const [member, setMember] = useState({
    name: "",
    email: [],
    city: "",
  });
  useEffect(() => {
    if(isError){
      console.log(error);
    }
    if(isSuccess){
      navigate("");
    }
  }, [isSuccess, isError])

  const handleSave = async (e) => {
    if (member) {
      await createMember(member);
    }
  }
  const handleCancel = (e) => {
    navigate("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };
  let areAllFieldsFilled =
    member.name !== "" &&
    member.email !=="" &&
    member.city !== ""

  return (
    <>
      <h3>Add Member</h3>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControl>
          <FormLabel
            sx={{ color: areAllFieldsFilled ? "green" : "red" }}
          >
            Member Details
          </FormLabel>
          <TextField
            sx={{ margin: 2 }}
            required
            id="outlined-required"
            label="Member Full Name"
            name="name"
            placeholder="Jane Doe"
            onChange={handleChange}
            defaultValue=""
          />
          <TextField
            sx={{ margin: 2 }}
            type='email'
            required
            id="outlined-required"
            label="Email"
            name="email"
            placeholder="member@gmail.com"
            onChange={handleChange}
            defaultValue=""
          />
          <TextField
            sx={{ margin: 2 }}
            required
            id="outlined-required"
            label="City"
            name="city"
            placeholder="New York"
            onChange={handleChange}
            defaultValue=""
          />
        </FormControl>
      </Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        direction="row"
        spacing={2}
      >
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
    </>
  );
};

export default AddMember;