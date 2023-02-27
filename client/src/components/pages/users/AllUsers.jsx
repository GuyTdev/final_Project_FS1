import '../../styles.css'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../rtk/features/users/usersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
const Users = () => {
  const {data: users, isLoading, isError} = useGetAllUsersQuery()
  const [deleteUser,{isSuccess}] = useDeleteUserMutation()
  const isAdmin =(id)=>{
    return false;
  }
  const handleDelete = (id) =>{
    if(!isAdmin())
    if(window.confirm("Are you sure you want to delete this user?")){
      deleteUser(id)
    }else{

    }
  }
  const handleEdit = (id) =>{
  }
  return (
    <>
      {/* Show data related to user. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    <h3>Users</h3>
    {isLoading?
        <div>Loading...</div>
        : !isError && users?.length>0 ? users?.map(user => <div key={user._id} className={"user_box"}>
                                            <p><b>Name:</b>{` ${user.firstName} ${user.lastName}`}</p>
                                            <b>Username:</b> {user.username}<br/>
                                            <b>Session Timeout:</b> {user.sessionTimeout}<br/>
                                            <b>Created At:</b> {user.createdDate.slice(0,10)}<br/>
                                            <b>Permissions:</b> {user.permissions.toString()}<br/>
                                            <Button variant="outlined" onClick={()=>handleDelete(user._id)} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            <Button variant="outlined" onClick={handleEdit} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                        </div>

    ):null}
  </>
)
}

export default Users