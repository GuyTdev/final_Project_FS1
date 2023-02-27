import '../../../styles.css'
import { useGetAllMembersQuery } from '../../../../rtk/features/members/membersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
const Members = () => {
  const {data: members, isLoading} = useGetAllMembersQuery()
  const handleDelete = () =>{
    //TODO implement
  }
  return (
    <>
      {/* Show data related to member. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    <h3>Members</h3>
    {isLoading?
        <div>Loading...</div>
        : members?.map(member => <div key={member._id} className={"member_box"}>
                                            <p><b>{member.name}</b></p>
                                            <b>Email:</b> {member.email}<br/>
                                            <b>City:</b> {member.city}<br/>
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

export default Members