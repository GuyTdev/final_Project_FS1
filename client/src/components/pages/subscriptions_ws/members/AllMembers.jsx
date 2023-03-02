import '../../../styles.css'
import { useDeleteMemberMutation, useGetAllMembersQuery } from '../../../../rtk/features/members/membersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import MoviesWatchedBox from '../subscriptions/MoviesWatchedBox';

const Members = () => {
  const navigate = useNavigate();
  const {data: members, isLoading} = useGetAllMembersQuery()
  const [deleteMember,{isError}]  = useDeleteMemberMutation()
  const handleDelete = (id) =>{

    if(window.confirm("Are you sure you want to delete this member?")){
      deleteMember(id)
    }
  }
  const handleEdit = (id) =>{
    console.log(`navigate to EditMember Page details with id: ${id}`)
    if(id){
      navigate(`${id}`)
    }
  }
  return (
    <>
      {/* Show data related to member. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    {isLoading?
        <div>Loading...</div>
        : members?.map(member => <div key={member._id} className={"member_box"}>
                                            <p><b>{member.name}</b></p>
                                            <b>Email:</b> {member.email}<br/>
                                            <b>City:</b> {member.city}<br/>
                                            <Button style={{margin:"5px"}} variant="outlined" onClick={()=>handleDelete(member._id)} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            <Button style={{margin:"5px"}} variant="outlined" onClick={()=>handleEdit(member._id)} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                            <MoviesWatchedBox member_id={member._id}/>
                                        </div>

    )}
  </>
)
}

export default Members