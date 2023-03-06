import '../../styles.css'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../rtk/features/users/usersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
const Users = () => {
  const navigate = useNavigate();
  const {data: users, isLoading, isFetching, isError} = useGetAllUsersQuery()
  const [deleteUser,{isSuccess}] = useDeleteUserMutation()
  const isAdmin =(id)=>{
    return false;
  }
  const handleDelete = (id) =>{
    if(!isAdmin())
    if(window.confirm("Are you sure you want to delete this user?")){
      deleteUser(id)
    }
    if(isSuccess)
      console.log(`user with id :${id} has been deleted`)

  }
  const handleEdit = (id) =>{
    console.log(`navigate to EditUserPage details with id: ${id}`)
    if(id){
      navigate(`${id}`)
    }
  }
  return (
    <>
      {/* Show data related to user. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    {isLoading || isFetching?
        <div>Loading...</div>
        : !isError && users?.length>0 ? users?.map(user => <div key={user._id} className={"user_box"}>
                                            <p><b>Name:</b>{` ${user.firstName} ${user.lastName}`}</p>
                                            <b>Username:</b> {user.username}<br/>
                                            <b>Session Timeout:</b> {user.sessionTimeout}<br/>
                                            <b>Created At:</b> {user.createdDate.slice(0,10)}<br/>
                                            <b>Permissions:</b> {user.permissions.toString().replaceAll(',',', ')}<br/>
                                            <Button variant="outlined" onClick={()=>handleDelete(user._id)} disabled={user.username.includes('admin')? true:false} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            <Button variant="outlined" onClick={()=>handleEdit(user._id)} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                        </div>

    ):<div>no users to display</div>}
  </>
)
}

export default Users