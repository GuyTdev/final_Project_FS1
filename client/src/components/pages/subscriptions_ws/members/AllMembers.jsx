import '../../../styles.css'
import { useDeleteMemberMutation, useGetAllMembersQuery } from '../../../../rtk/features/members/membersApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
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
    console.log(`navigate to EditMember Page details with id: ${id}`)
    if(id){
      navigate(`${id}`)
    }
  }
  return (
    <>
      {/* Show data related to member. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    {isError?<div>an error accured while fetching members</div>:isLoading?
        <div>Loading...</div>
        : members?.map(member => <div key={member._id} className={"member_box"}>
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
                                        </div>

    )}
  </>
)
}

export default Members