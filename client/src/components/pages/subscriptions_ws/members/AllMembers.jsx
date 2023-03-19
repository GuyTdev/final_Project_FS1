import '../../../styles.css'
import { useDeleteMemberMutation, useGetAllMembersQuery } from '../../../../rtk/features/members/membersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import MoviesWatchedBox from '../subscriptions/MoviesWatchedBox';
import { useEffect } from 'react';
import { useDeleteSubscriptionByMemberIdMutation } from '../../../../rtk/features/subscriptions/subscriptionsApiSlice';
import { useSelector } from 'react-redux';

const Members = () => {
  const navigate = useNavigate();
  const {permissions} = useSelector(state=>state.user.userDetails)
  const {data: members, isLoading,isError,error} = useGetAllMembersQuery()
  const [deleteMember,{isSuccess,isError:isErrorDeleting, error:errorDelete}]  = useDeleteMemberMutation()
  const [deleteSubscriptionByMemberIdMutation,{isSuccess:isSuccessDeleteSubscriptionByMemberId,isError:isErrorDeleteSubscriptionByMemberId, error:errorDeleteSubscriptionByMemberId}] = useDeleteSubscriptionByMemberIdMutation()
  useEffect(() => {
    if(isSuccess && isSuccessDeleteSubscriptionByMemberId){
      navigate("")
      console.log(`member deleted successfully`);
     }
     if(isErrorDeleting || isErrorDeleteSubscriptionByMemberId){
      if(isErrorDeleting){
        console.log(`error while deleting data: ${errorDelete}`);
      }
      if(isErrorDeleteSubscriptionByMemberId){
        console.log(`error while deleting data by memberId: ${errorDeleteSubscriptionByMemberId}`);
      }
     }
     if(isError){
      console.log(`error while fetching data: ${error}`);
     }
  }, [isSuccess,isSuccessDeleteSubscriptionByMemberId,isErrorDeleteSubscriptionByMemberId,isErrorDeleting,isError])
  const handleDelete = async(id) =>{

    if(window.confirm("Are you sure you want to delete this member?")){
      await deleteMember(id)
      await deleteSubscriptionByMemberIdMutation(id);
    }
  }
  const handleEdit = (id) =>{
    if(id){
      navigate(`${id}`)
    }
  }
  return (
    <>
      {/* Show data related to member. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    {isError?<div>an error occurred while fetching members</div>:isLoading?
        <div>Loading...</div>
        :!isError?<Grid container  style={{ display: "flex", justifyContent: "center" }} sx={{gap:1}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 10, md: 13, lg:15}}>
         {members?.map(member => <Grid className={"member_box"}  item xs={2} sm={4} md={4} key={member._id} >
                                            <p><b>{member.name}</b></p>
                                            <b>Email:</b> {member.email}<br/>
                                            <b>City:</b> {member.city}<br/>
                                            {permissions?.includes("Update Subscriptions")?
                                            <Button style={{margin:"5px"}} variant="outlined" onClick={()=>handleEdit(member._id)} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                            :null}
                                            {permissions?.includes("Delete Subscriptions")?
                                            <Button style={{margin:"5px"}} variant="outlined" onClick={()=>handleDelete(member._id)} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            :null}

                                            <MoviesWatchedBox member_id={member._id}/>
                                        </Grid>

    )}
    </Grid>:isError?<div>failed to load data</div>:<div>no members to show</div>}

  </>
)
}

export default Members