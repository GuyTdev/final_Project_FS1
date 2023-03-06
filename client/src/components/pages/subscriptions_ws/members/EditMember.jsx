import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useUpdateMemberMutation, useGetMemberQuery } from "../../../../rtk/features/members/membersApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditMember = () => {
  const {id} = useParams();

  const navigate = useNavigate();
  const [updatedMember, setUpdatedMember] = useState({
    name: "",
    email: [],
    city: "",
  });
  const {data: member, isLoading, isError:isErrorGetMember} = useGetMemberQuery(id);
  const [updateMember, { isSuccess, isError, error }] =
  useUpdateMemberMutation();
  useEffect(() => {
    if(member){
      setUpdatedMember(member);
    }
  }, [member])
  useEffect(() => {
    if(isError){
      console.log(error);
    }
    if(isSuccess){
      console.log(`successfully updated member with id:${id}`);
      navigate("");
    }
  }, [isSuccess,isError])
  const handleUpdate = async() => {
    if (updatedMember) {
       await updateMember(updatedMember);
    }
  }
  const handleCancel = (e) => {
    console.log("canceled");
    navigate("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };
  let areAllFieldsFilled =
    updatedMember?.name !== "" &&
    updatedMember?.email!=="" &&
    updatedMember?.city !== ""

  return (
    <>
    {isErrorGetMember?null:isLoading?<div>Loading...</div>:
    <div>
      <h3>Edit Member</h3>
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
            label="Member Name"
            name="name"
            placeholder="Member name"
            onChange={handleChange}
            defaultValue={member?.name}
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
            defaultValue={member?.email}
          />
          <TextField
            sx={{ margin: 2 }}
            required
            id="outlined-required"
            label="City"
            name="city"
            placeholder="New York"
            onChange={handleChange}
            defaultValue={member?.city}
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
    </div>

      }
    </>
  );
};

export default EditMember;