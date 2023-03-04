import { Button } from "@mui/material"
import { useState } from "react"
import { useGetAllMoviesQuery } from "../../../../rtk/features/movies/moviesApiSlice"
import {  useGetSubscriptionByMemberIdQuery } from "../../../../rtk/features/subscriptions/subscriptionsApiSlice"
import AddMovieToSubscription from "./AddMovieToSubscription"

const MoviesWatched = ({member_id}) => {
  const [showAddMovieToSubscriptionsBox, setShowAddMovieToSubscriptionsBox] = useState(false)
  const {data: subscription,isSuccess} =useGetSubscriptionByMemberIdQuery(member_id)
  const {data:movies, isSuccess:isSuccessMovies} = useGetAllMoviesQuery()
  let memberSubscribedMoviesNamesAndDates=[]
  let memberMoviesIdsSubscribedArray=[]
  if(isSuccess&& isSuccessMovies){
    console.log(subscription)
    memberMoviesIdsSubscribedArray= subscription?.movies.map(movie => movie.movieId)
    console.log("memberMoviesIdsSubscribedArray",memberMoviesIdsSubscribedArray)
    memberSubscribedMoviesNamesAndDates =subscription.movies.map(movieObj => {
      let movie_index = movies?.findIndex(movie => movie._id === movieObj.movieId)
      if(movie_index!== -1){
        return {name:movies[movie_index].name, date: movieObj.date}
      }
      return movieObj
    })
    console.log("memberSubscribedMoviesNamesAndDates",memberSubscribedMoviesNamesAndDates)
  }
  
  return (
    <div className="movies_watched_box">
      <b>MoviesWatched</b>
      <Button sx={{margin:2}} variant="contained" onClick={()=>{setShowAddMovieToSubscriptionsBox(!showAddMovieToSubscriptionsBox)}}>
          Subscribe to new movie
      </Button>
      {showAddMovieToSubscriptionsBox? <AddMovieToSubscription member_id={member_id} memberMoviesIdsSubscribedArray={[]} setShowAddMovieToSubscriptionsBox={setShowAddMovieToSubscriptionsBox}/> : null}
      <ul>
      {memberSubscribedMoviesNamesAndDates?.map((movie, index)=>
              <li key={index}>
                <div>
                {movie.name}, {movie.date.slice(0,10)}
                </div>
              </li>
      
      )}

      </ul>
      </div>
  )
}

export default MoviesWatched