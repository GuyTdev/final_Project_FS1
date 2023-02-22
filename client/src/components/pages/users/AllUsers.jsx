import '../../styles.css'
import { useGetAllUsersQuery } from '../../../rtk/features/users/usersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
const Users = () => {
  const {data: users, isLoading} = useGetAllUsersQuery()
  const handleDelete = () =>{
    //TODO implement
  }
  return (
    <>
      {/* Show data related to user. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    <h3>Users</h3>
    {isLoading?
        <div>Loading...</div>
        : users?.map(user => <div key={user.id} className={"user_box"}>
                                            <p><b>Name:</b>{` ${user.firstName} ${user.lastName}`}</p>
                                            <b>Username:</b> {user.username}<br/>
                                            <b>Session Timeout:</b> {user.sessionTimeout}<br/>
                                            <b>Created At:</b> {user.createdDate.slice(0,10)}<br/>
                                            <b>Permissions:</b> {user.permissions.toString()}<br/>
                                            <Button style={{margin:"5px"}} variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            <Button style={{margin:"5px"}} variant="outlined" onClick={handleDelete} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                        </div>

    )}
  </>
)
}

export default Users