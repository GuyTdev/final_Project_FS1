import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllMembersQuery } from "../../../../rtk/features/members/membersApiSlice";
import { useGetAllSubscriptionsQuery } from "../../../../rtk/features/subscriptions/subscriptionsApiSlice";

const SubscriptionsWatched = ({movieId}) => {
  const {data:allMembers} = useGetAllMembersQuery();
  const { data: subscriptionsArray } = useGetAllSubscriptionsQuery()
  const [membersListOfMovie, setMembersListOfMovie] = useState(null)
  const {permissions} = useSelector(state=>state.user.userDetails)


  useEffect(() => {
      let tmp_membersListOfMovie = [];
      if(allMembers && subscriptionsArray){
        subscriptionsArray?.forEach(subscription =>
        {
            const found = subscription.movies.findIndex(movie => movie.movieId === movieId)
            if(found !== -1) {
              tmp_membersListOfMovie.push({memberId:subscription.memberId, name: getMemberNameById(subscription.memberId), date:subscription.movies[found].date})
            }
        }

        )
        setMembersListOfMovie(tmp_membersListOfMovie)
      }
  },[subscriptionsArray, allMembers])
  const getMemberNameById = (memberId) => {
    const member = allMembers?.find(member => member._id === memberId)
    return member.name
  }
return (
  <div className="subscriptions_watched_box">
    {membersListOfMovie?
    <div>
      <h3>subscriptions watched</h3>
      <ul>
          {membersListOfMovie?.map(member => <li key={member.name}>
            {permissions?.includes('Update Subscriptions')?<Link style={{color:'rgb(150,205,223)'}} to={`../members/${member.memberId}`}>{member.name}</Link>:member.name}, {member.date.slice(0,10)}
        </li>)}
      </ul>
    </div>
    :null}
  </div>
)
}

export default SubscriptionsWatched
